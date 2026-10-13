# Production Deployment & Operations Guide

This guide provides end-to-end instructions for deploying, configuring, and maintaining the **Kritunga The Palegar's Cuisine** application in production environments.

---

## 1. Pre-Flight Production Readiness Checklist

Before initiating any deployment, run the verification pipeline locally or in CI:

```bash
# 1. Typecheck & build backend
npm run build:backend

# 2. Typecheck & build frontend
npm run build:frontend

# 3. Verify SQLite schema & migrations
npm run db:push --workspace=backend
npm run db:seed --workspace=backend

# 4. Run production launch locally to verify bundle integrity
npm run start:backend
npm run start:frontend
```

Verify backend health check:
```bash
curl -f http://localhost:5000/api/health
# Expected JSON response:
# {"status":"healthy","database":"connected","service":"Kritunga Palegar Backend API","version":"1.0.0"}
```

---

## 2. Production Architecture Overview

The Kritunga platform is built as a modular monorepo:
- **Frontend**: Next.js 14 App Router, React 18, Tailwind CSS, TypeScript.
  - Server-side rendering (SSR) for tracking & dynamic pages, static generation for marketing sections.
  - Optimized HTML5 canvas frame sequence scrubber (240 WebP frames with $2.0\times$ DPR capping).
  - Modal engines: `OrderPartnerModal` (Swiggy/Zomato), `TableReservationModal` (table diwans), `ConventionBookingModal` (100-capacity banquet).
- **Backend**: Node.js, Express 4.21, TypeScript, Prisma ORM 6.
  - SQLite embedded database (`dev.db` / `kritunga.db`) with persistent singleton connection management.
  - WhatsApp notification service with Meta Cloud API integration and automatic `wa.me` fallback.
  - Health check & REST APIs for conventions, reservations, menu, and tracking.

---

## 3. Environment Variables Reference Matrix

### Root / Shared (`.env`)
| Variable | Description | Production Example | Required |
| :--- | :--- | :--- | :--- |
| `NODE_ENV` | Runtime environment | `production` | **Yes** |
| `PORT` | Backend HTTP port | `5000` | **Yes** |
| `DATABASE_URL` | Prisma SQLite or PostgreSQL URL | `file:./data/kritunga.db` | **Yes** |
| `FRONTEND_URL` | Public frontend URL for CORS whitelist | `https://kritunga.yourdomain.com` | **Yes** |
| `NEXT_PUBLIC_API_URL` | Backend API URL reachable by client | `https://api.kritunga.yourdomain.com` | **Yes** |
| `WHATSAPP_TOKEN` | Meta WhatsApp Cloud API Bearer Token | `EAAx...` | Optional (falls back to click-to-chat) |
| `WHATSAPP_PHONE_NUMBER_ID` | Meta WhatsApp Sender Phone ID | `1029384756` | Optional |

### Backend Service (`backend/.env`)
```ini
NODE_ENV=production
PORT=5000
DATABASE_URL=file:./data/kritunga.db
FRONTEND_URL=https://kritunga.yourdomain.com
WHATSAPP_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_BUSINESS_ACCOUNT_ID=
```

### Frontend Service (`frontend/.env.production`)
```ini
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.kritunga.yourdomain.com
```

---

## 4. Option A: Single-Host Docker & Docker Compose (Recommended)

Ideal for VPS instances (AWS EC2, DigitalOcean Droplet, Hetzner, Linode) or any Linux server with Docker Engine installed.

### Step 1: Clone Repository & Configure Environment
```bash
git clone <your-repo-url> /opt/kritunga
cd /opt/kritunga
cp .env.example .env
```
Edit `.env` to configure your domains and production settings:
```ini
NODE_ENV=production
PORT=5000
DATABASE_URL=file:./data/kritunga.db
FRONTEND_URL=https://kritunga.yourdomain.com
NEXT_PUBLIC_API_URL=https://api.kritunga.yourdomain.com
```

### Step 2: Build & Start Containers
```bash
docker compose up -d --build
```
- **Backend Service**: Multi-stage Alpine Node container on port `5000`. The persistent SQLite database is mounted to the named volume `backend-data` (`/app/backend/data/kritunga.db`). Automatically applies schema on launch.
- **Frontend Service**: Multi-stage Alpine Node container on port `3000`. Waits for the backend health check to report healthy before serving traffic.

### Step 3: Verify Status & Live Logs
```bash
# Check container status
docker compose ps

# View unified live logs
docker compose logs -f

# Inspect backend logs
docker compose logs -f backend

# Inspect frontend logs
docker compose logs -f frontend
```

---

## 5. Option B: Decoupled Cloud Deployment (Vercel + Render / Railway)

Ideal for serverless edge scale with zero VPS maintenance.

### Part 1: Deploy Backend (Render / Railway / Fly.io)
1. Link your Git repository on **Render** or **Railway**.
2. Set Root Directory to: `backend`
3. Build Command:
   ```bash
   npm install && npx prisma generate && npm run build
   ```
4. Start Command:
   ```bash
   npm run start:prod
   ```
5. Configure Environment Variables in the hosting dashboard:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `DATABASE_URL=file:./data/kritunga.db` (or a managed PostgreSQL connection string)
   - `FRONTEND_URL=https://kritunga.vercel.app`
6. Verify deployment by hitting: `https://<your-backend-domain>/api/health`

### Part 2: Deploy Frontend (Vercel)
1. Import repository on **Vercel**.
2. Set Root Directory to: `frontend`
3. Framework Preset: **Next.js**
4. Configure Environment Variables:
   - `NEXT_PUBLIC_API_URL=https://<your-backend-domain>`
5. Click **Deploy**. Vercel will build static assets and deploy server functions to its global Edge CDN.

---

## 6. Option C: Ubuntu/Debian VPS with PM2 and Nginx

Ideal for complete operational control on a private virtual server.

### Step 1: Install System Dependencies
```bash
sudo apt update && sudo apt install -y nodejs npm nginx certbot python3-certbot-nginx sqlite3
sudo npm install -g pm2
sudo pm2 install pm2-logrotate
```

### Step 2: Setup Application Directory
```bash
sudo mkdir -p /var/www/kritunga
sudo chown -R $USER:$USER /var/www/kritunga
git clone <your-repo-url> /var/www/kritunga
cd /var/www/kritunga

# Install dependencies & build
npm install
npm run build

# Push database schema & seed initial records
npm run db:push --workspace=backend
npm run db:seed --workspace=backend
```

### Step 3: Launch with PM2 Process Manager
```bash
# Start processes defined in ecosystem.config.js
pm2 start ecosystem.config.js

# Save process list and enable system boot launch
pm2 save
pm2 startup
```

Verify PM2 status:
```bash
pm2 status
pm2 logs --lines 50
```

### Step 4: Configure Nginx Reverse Proxy & SSL
Create `/etc/nginx/sites-available/kritunga`:
```nginx
server {
    server_name kritunga.yourdomain.com;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json image/svg+xml;

    # Frontend Next.js Client
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static Assets Caching (Canvas Frames & Images)
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /images/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 30d;
        add_header Cache-Control "public, max-age=2592000";
    }

    # Backend Express API Routes
    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }
}
```

Enable configuration and provision SSL via Let's Encrypt:
```bash
sudo ln -s /etc/nginx/sites-available/kritunga /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d kritunga.yourdomain.com
```

---

## 7. Database Maintenance & Backup Strategy

### SQLite Database File Location
- **Docker Compose**: Stored in persistent Docker volume `backend-data` (`/app/backend/data/kritunga.db`).
- **Bare Metal / PM2**: Stored in `backend/data/kritunga.db` (or `backend/dev.db`).

### Non-Blocking Hot Backup
SQLite provides an online non-blocking backup mechanism that avoids `SQLITE_BUSY` locks:
```bash
# Execute safe point-in-time snapshot
sqlite3 backend/data/kritunga.db ".backup 'backend/data/backup_$(date +%Y%m%d_%H%M%S).db'"
```

### Automated Daily Backup Cron Job
```bash
# Add to crontab: crontab -e
0 3 * * * sqlite3 /var/www/kritunga/backend/data/kritunga.db ".backup '/var/backups/kritunga_$(date +\%Y\%m\%d).db'" && find /var/backups/ -name "kritunga_*.db" -mtime +14 -delete
```

### Prisma Schema Updates in Production
When updating models in `backend/prisma/schema.prisma`:
```bash
# Apply schema changes safely
npm run db:push --workspace=backend

# Regenerate client artifacts
npx prisma generate --schema=backend/prisma/schema.prisma
```

---

## 8. Security & Operational Hardening

1. **Strict Transport Security (HSTS)**: Configured in Next.js headers and Nginx with `max-age=63072000; includeSubDomains; preload`.
2. **Clickjacking Defense**: `X-Frame-Options: SAMEORIGIN` applied globally across all HTML responses.
3. **MIME-Type Sniffing Protection**: `X-Content-Type-Options: nosniff`.
4. **CORS Origin Whitelisting**: Express strictly allows only the domain specified in `FRONTEND_URL` and `localhost:3000` for development.
5. **Reverse Proxy IP Trust**: Express runs `app.set('trust proxy', 1)` to ensure genuine client IP extraction behind load balancers and CDNs.
6. **Graceful Shutdown**: Production servers catch `SIGTERM` and `SIGINT` signals, gracefully closing HTTP listeners and disconnecting the Prisma connection pool cleanly.

---

## 9. Production Troubleshooting Runbook

### Issue: `SQLITE_BUSY: database is locked`
- **Cause**: Multiple uncoordinated processes attempting concurrent writes, or unclosed connection handles during rapid reloading.
- **Remedy**:
  1. Ensure the persistent Prisma singleton in `backend/src/services/db.service.ts` is used exclusively.
  2. Verify no background scripts hold open write locks: `fuser /var/www/kritunga/backend/data/kritunga.db`.
  3. Ensure SQLite journal mode is set to WAL (Write-Ahead Logging): `sqlite3 backend/data/kritunga.db "PRAGMA journal_mode=WAL;"`.

### Issue: Modal Overflow / Clipped Viewport on Small Screens
- **Cause**: Ancestor elements with CSS `transform` or `fixed` coordinates trapping modal stacking context.
- **Remedy**:
  - All interactive modals (`TableReservationModal`, `ConventionBookingModal`, `OrderPartnerModal`) are mounted at the root `<main>` level in `frontend/app/page.tsx` and utilize the pinned-header + inner scroll pattern (`max-h-[92vh] flex flex-col`).

### Issue: Canvas Memory Pressure on Mobile
- **Cause**: Unconstrained device pixel ratio multiplying backbuffer dimensions.
- **Remedy**:
  - The canvas rendering engine in `ProductBottleScroll.tsx` enforces `Math.min(window.devicePixelRatio || 1, 2.0)` to keep memory under 35 MB on all viewports.
