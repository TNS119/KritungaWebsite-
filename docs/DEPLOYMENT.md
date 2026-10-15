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

---

## 4. Option A: AWS Free Tier EC2 Implementation Plan (100% Free for 12 Months)

Deploying the Kritunga monorepo on AWS can be done **completely free for 12 months** using the AWS Free Tier. Below is the step-by-step deployment blueprint including memory optimization to prevent build crashes.

### AWS Free Tier Resources Utilized
- **Compute:** 1x EC2 `t2.micro` (or `t3.micro` in eligible regions) — 750 hours/month free (enough to run 24/7).
- **Storage:** 30 GB EBS General Purpose SSD (gp3) — 100% Free.
- **Networking:** 100 GB/month data transfer out to the internet — 100% Free.
- **CDN:** AWS CloudFront 1 TB/month data transfer out + 10,000,000 HTTP/HTTPS requests — 100% Free *always*.

---

### Step 1: Launch EC2 Instance & Configure Security Group
1. Sign in to the **AWS Management Console** and navigate to **EC2** > **Launch Instance**.
2. **Name:** `kritunga-production`
3. **OS Image (AMI):** `Ubuntu Server 24.04 LTS (HVM), SSD Volume Type` (Free tier eligible).
4. **Instance Type:** `t2.micro` (1 vCPU, 1 GB RAM) or `t3.micro` if available in your region.
5. **Key Pair:** Create a new key pair or select an existing `.pem` key (e.g. `kritunga-key.pem`).
6. **Network Settings (Security Group):** Allow the following inbound traffic:
   - **SSH (Port 22):** Source: `My IP` (for secure administration).
   - **HTTP (Port 80):** Source: `Anywhere (0.0.0.0/0)` (for Let's Encrypt challenge and HTTP).
   - **HTTPS (Port 443):** Source: `Anywhere (0.0.0.0/0)` (for SSL web traffic).
7. **Storage:** Set root volume to `25 GB` gp3 (remains well within the 30 GB free tier limit).
8. Click **Launch Instance**.
9. **Elastic IP (Optional but Recommended):** In EC2 Console > **Elastic IPs** > Allocate Elastic IP and associate it with your new instance. This ensures your public IP remains permanent across instance stops/reboots.

---

### Step 2: Connect and Configure Mandatory Swap Memory (Prevents OOM)
Next.js production compilation spikes to 1.5 GB – 1.8 GB RAM. On a 1 GB instance, you **must** configure a 3 GB swapfile before running builds:

```bash
# SSH into your EC2 instance
ssh -i "kritunga-key.pem" ubuntu@<YOUR_EC2_PUBLIC_IP>

# Create a 3 GB Swapfile to handle Next.js compilation
sudo fallocate -l 3G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make swap permanent across reboots
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verify swap memory is active
free -h
# Output should show ~1.0Gi Mem and 3.0Gi Swap
```

---

### Step 3: Install Docker, Git, and Nginx
```bash
# Update repositories
sudo apt update && sudo apt upgrade -y

# Install Docker, Git, Nginx, and Certbot
sudo apt install -y git nginx certbot python3-certbot-nginx docker.io docker-compose-v2

# Allow ubuntu user to execute docker without sudo
sudo usermod -aG docker $USER
newgrp docker

# Verify Docker engine
docker --version
docker compose version
```

---

### Step 4: Clone Repository & Configure Environment
```bash
# Clone the repository
git clone <your-github-repo-url> /opt/kritunga
cd /opt/kritunga

# Create production environment configuration
cp .env.example .env
nano .env
```

Set your production variables in `.env`:
```ini
NODE_ENV=production
PORT=5000
DATABASE_URL=file:./data/kritunga.db
FRONTEND_URL=https://kritunga.yourdomain.com
NEXT_PUBLIC_API_URL=https://kritunga.yourdomain.com/api
```

---

### Step 5: Build & Start Docker Containers
```bash
# Build and launch both frontend and backend
docker compose up -d --build

# Verify running containers
docker compose ps
# Both kritunga-backend and kritunga-frontend should report 'Up'
```

---

### Step 6: Configure Nginx Reverse Proxy & Let's Encrypt SSL
Create `/etc/nginx/sites-available/kritunga`:
```bash
sudo nano /etc/nginx/sites-available/kritunga
```

Paste the unified single-domain routing block:
```nginx
server {
    server_name kritunga.yourdomain.com;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript image/svg+xml;

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

    # Static Assets Caching (240 WebP Scroller Frames)
    location /images/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
    }

    # Backend Express REST API Routes
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

Enable site and provision free SSL:
```bash
sudo ln -s /etc/nginx/sites-available/kritunga /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Install free auto-renewing SSL certificate via Certbot
sudo certbot --nginx -d kritunga.yourdomain.com
```

---

### Step 7: Offload Canvas Scroller Frames to CloudFront (Zero-Cost CDN)
1. Go to **AWS CloudFront** > **Create Distribution**.
2. **Origin Domain:** `kritunga.yourdomain.com`
3. **Behaviors:**
   - Path `/images/*`: Cache Optimized (`Cache-Control` header respected).
   - Path `/*`: Forward all traffic to origin with `Host` header.
4. **Result:** All 240 WebP canvas frames are delivered from AWS edge locations worldwide at sub-20ms latency, taking zero bandwidth from your EC2 instance.

---

## 5. Option B: Alternative Free & Low-Cost Production Hosting Providers

If you do not want to manage an AWS EC2 server or want **permanent free tiers** that do not expire after 12 months, the following production-grade hosting providers are ideal for this stack:

### Comparison Matrix: Production-Grade Free Hosting Providers

| Provider | Components Hosted | Free Tier Quota | Why It Fits This Project |
| :--- | :--- | :--- | :--- |
| **Vercel** + **Render** + **Supabase** | Frontend on Vercel, Backend on Render, DB on Supabase | **100% Free Forever** (Vercel 100GB/mo bandwidth, Render free web service, Supabase 500MB Postgres) | **Best overall setup.** Vercel provides world-class Edge SSR for Next.js 14; Supabase provides managed PostgreSQL; Render hosts the Express API with keep-alive cron. |
| **Oracle Cloud Infrastructure (OCI)** | Both Frontend & Backend (Docker Compose) | **Always Free Forever** (4 OCPUs, 24 GB RAM ARM Ampere A1 compute, 200 GB SSD) | **Most powerful free server in the industry.** Far surpasses AWS free tier. Runs the entire monorepo Docker Compose stack with massive 24 GB RAM buffer. |
| **Fly.io** | Backend API + SQLite | 3 shared-cpu-1x VMs, 3 GB persistent storage | Supports Docker containers and allows attaching a persistent volume directly to SQLite (`/data/kritunga.db`). |
| **Railway** | Full Monorepo | $5 monthly credit / trial | Automatically detects Next.js frontend and Express backend in a single workspace with zero configuration. |

---

### Recommended Permanent Free Stack Blueprint: Vercel + Render + Supabase

```mermaid
flowchart LR
    Client["User Browser"]
    Vercel["Vercel Edge Network\n(Next.js 14 Frontend)"]
    Render["Render Web Service\n(Express Backend API)"]
    Cron["GitHub Actions\n(12-Min Keep-Alive Heartbeat)"]
    Supabase[("Supabase Free Tier\n(Managed PostgreSQL)")]

    Client -->|Page Load & Scroller| Vercel
    Client -->|API Calls /api/*| Render
    Cron -->|Ping /api/health| Render
    Render -->|CRUD Operations| Supabase
```

#### 1. Setup Database on Supabase (Free Forever)
1. Sign up at [supabase.com](https://supabase.com) and create a free project named `kritunga-db`.
2. Copy the Connection String from **Project Settings > Database > URI (Transaction Pooler)**:
   ```
   DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```
3. In `backend/prisma/schema.prisma`, update provider to `"postgresql"`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Push schema: `npx prisma db push --schema=backend/prisma/schema.prisma`.

#### 2. Deploy Backend on Render (Free Web Service)
1. Link your GitHub repository on [render.com](https://render.com).
2. Create a new **Web Service**:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm run start:prod`
3. Add Environment Variables:
   - `NODE_ENV=production`
   - `DATABASE_URL=<your-supabase-connection-string>`
   - `FRONTEND_URL=https://kritunga.vercel.app`
4. The backend is live at `https://kritunga-api.onrender.com`. The pre-configured GitHub Actions heartbeat cron ping (`.github/workflows/ci-cd.yml`) keeps it awake 24/7.

#### 3. Deploy Frontend on Vercel (Free Forever)
1. Import repository on [vercel.com](https://vercel.com).
2. Set **Root Directory** to `frontend`.
3. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL=https://kritunga-api.onrender.com`
4. Click **Deploy**. Vercel optimizes images, bundles Next.js 14, and assigns a global CDN URL (`https://kritunga.vercel.app`) with automatic SSL.

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
