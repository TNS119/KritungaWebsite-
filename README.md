# KRITUNGA — The Palegar's Cuisine
### *The Royal Taste of Rayalaseema | Awwwards-Caliber Scrollytelling Monorepo*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-24.0-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

---

## 🌶️ Overview

**KRITUNGA — The Palegar's Cuisine** is an enterprise-grade hospitality monorepo featuring a decoupled **Next.js 14 Frontend** and an **Express + TypeScript Backend API** powered by **Prisma ORM**.

Dedicated exclusively to the royal culinary traditions of **Kritunga Nalgonda Flagship**, the application combines:
1. **Interactive Scrollytelling**: 240-frame DPR-aware HTML5 canvas frame sequencer with sensory physics cards and ancestral culinary showcases.
2. **Delivery Aggregator Gateway**: Seamless 1-click ordering on official partner storefronts (**Swiggy** & **Zomato**) with verified Nalgonda restaurant links.
3. **Royal Table Reservations**: Fast-path in-house dining table booking engine with guaranteed seating and WhatsApp booking dispatch.
4. **Grand Palace Convention & Banquet Bookings**: Full-stack event reservation pipeline for the 100-capacity Grand Convention Hall, corporate banquets, and royal weddings.

---

## 📂 Architecture & Directory Structure

```bash
Kritunga Web Application/
├── backend/                         # Node.js + Express (TypeScript) API Service
│   ├── prisma/
│   │   ├── schema.prisma            # SQLite database schema (Outlets, Reservations, Conventions, Orders)
│   │   ├── seed.ts                  # Database seeder for Nalgonda Flagship & menu catalog
│   │   └── migrations/              # Prisma migration records
│   ├── src/
│   │   ├── routes/
│   │   │   ├── convention.routes.ts # POST/GET /api/conventions (Palace banquet booking pipeline)
│   │   │   ├── reservation.routes.ts# POST/GET /api/reservations (Dining table reservations)
│   │   │   ├── order.routes.ts      # POST/GET /api/orders (Order lookups & outlet metadata)
│   │   │   ├── tracking.routes.ts   # GET /api/orders/track/:orderNumber (Live preparation tracking)
│   │   │   ├── menu.routes.ts       # GET /api/menu & /api/menu/:id (Culinary items)
│   │   │   └── whatsapp.routes.ts   # POST /api/whatsapp/webhook (Meta Cloud API integration)
│   │   ├── services/
│   │   │   ├── db.service.ts        # Prisma Client singleton (Prevents SQLite hot-reload locks)
│   │   │   └── whatsapp.service.ts  # WhatsApp message builder with direct wa.me fallback
│   │   └── server.ts                # Express app, CORS, security headers & /api/health
│   ├── .env.example                 # Backend environment variable template
│   ├── Dockerfile                   # Multi-stage production container definition
│   ├── package.json                 # Backend dependencies & build scripts
│   └── tsconfig.json                # Backend TypeScript configuration
│
├── frontend/                        # Next.js 14 App Router Client
│   ├── app/
│   │   ├── globals.css              # Font bindings, custom modal scroll styles & theme tokens
│   │   ├── layout.tsx               # Google Fonts (Cinzel & Outfit), SEO metadata & theme provider
│   │   ├── not-found.tsx            # Regal Palegar 404 boundary
│   │   ├── track/[orderNumber]/     # Order tracking route
│   │   └── page.tsx                 # Core assembly page orchestrating sections and modals
│   ├── components/
│   │   ├── Navbar.tsx               # Fixed header with theme toggle, mobile drawer & modal triggers
│   │   ├── ProductBottleScroll.tsx  # 240-frame DPR-clamped HTML5 canvas frame scrubber
│   │   ├── ProductTextOverlays.tsx  # Scroll-tied hero typography & order action triggers
│   │   ├── ProductDetails.tsx       # Culinary anatomy & Grade A+ heritage standards
│   │   ├── CinematicIceSection.tsx  # Authentic dish photography & spice alchemy cards
│   │   ├── BuyNow.tsx               # Feast pack customizer with direct Swiggy & Zomato buttons
│   │   ├── ConventionBookingSection.tsx # 100-capacity Grand Banquet Hall showcase with direct form
│   │   ├── ConventionBookingModal.tsx   # Interactive banquet booking modal with pinned header
│   │   ├── TableReservationModal.tsx    # Royal dining table booking modal with pinned header
│   │   ├── OrderPartnerModal.tsx        # Official Swiggy & Zomato partner delivery modal
│   │   ├── SpiceIcon.tsx            # Dedicated Rayalaseema spice pod SVG emblem
│   │   ├── SectionNav.tsx           # Floating scroll-spy navigation capsule
│   │   └── Footer.tsx               # Brand editorial footer & Nalgonda flagship directory
│   ├── context/
│   │   └── ThemeContext.tsx         # Obsidian Charcoal / Imperial Ivory theme provider
│   ├── services/
│   │   └── api.ts                   # Type-safe frontend API client
│   ├── public/
│   │   ├── images/dishes/           # High-resolution dish photography
│   │   ├── images/traditions/       # Earthen pot & heritage spice photography
│   │   └── images/kritunga/         # 240 WebP canvas frames (1.webp -> 240.webp)
│   ├── Dockerfile                   # Multi-stage production Next.js container
│   ├── next.config.mjs              # Next.js bundler configuration & API proxy
│   ├── tailwind.config.js           # Custom Palegar tokens, colors & gradients
│   └── package.json                 # Frontend client dependencies
│
├── docs/                            # Comprehensive Documentation
│   ├── DEPLOYMENT.md                # Production deployment, Docker, Nginx, PM2 & backup guide
│   ├── SPEC.md                      # Technical specifications & project boundaries
│   ├── DECISIONS.md                 # Architecture Decision Records (ADRs)
│   ├── MEMORY.md                    # Incident log & permanent anti-recurrence invariants
│   └── DESIGN.md                    # Visual design tokens & typography rules
│
├── docker-compose.yml               # Production container orchestration
├── ecosystem.config.js              # PM2 cluster configuration for Linux VPS
├── AGENTS.md                        # AI coding agent directives & boundaries
├── CONTEXT.md                       # File-level architecture registry
├── package.json                     # Monorepo root workspace orchestrator
└── README.md                        # Project documentation
```

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm** (v7+ with workspace support)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Files
```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

### 3. Initialize Database
```bash
# Push Prisma schema to SQLite
npm run db:push --workspace=backend

# Seed database with Nalgonda flagship outlet and menu items
npm run db:seed --workspace=backend
```

### 4. Start Development Servers
```bash
# Run both Frontend (http://localhost:3000) and Backend (http://localhost:5000) concurrently:
npm run dev
```

---

## 🏗️ Production Builds & Verification

Before deploying, verify clean compilation across both workspaces:

```bash
# 1. Typecheck & build backend
npm run build:backend

# 2. Typecheck & build frontend
npm run build:frontend

# 3. Test production launch locally
npm run start:backend
npm run start:frontend
```

---

## 🚢 Production Deployment Options

Detailed production runbooks are documented in **[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)**. Below is a quick summary:

### Option A: Docker Compose (Recommended for VPS)
```bash
# 1. Configure production environment
cp .env.example .env
nano .env

# 2. Build and launch containers in background
docker compose up -d --build

# 3. Monitor container health
docker compose ps
docker compose logs -f
```
* Persistent SQLite database is mounted in `backend-data` volume (`/app/backend/data/kritunga.db`).
* Frontend starts automatically after the backend reports healthy.

### Option B: Linux VPS with PM2 & Nginx
```bash
# 1. Install PM2 and logrotate
sudo npm install -g pm2
pm2 install pm2-logrotate

# 2. Build and push database schema
npm run build
npm run db:push --workspace=backend
npm run db:seed --workspace=backend

# 3. Start services with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 4. Link Nginx reverse proxy configuration & provision SSL
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d kritunga.yourdomain.com
```

### Option C: Decoupled Cloud (Vercel + Render / Railway)
- **Backend**: Deploy `backend/` to Render or Railway with build command `npm install && npx prisma generate && npm run build` and start command `npm run start:prod`.
- **Frontend**: Deploy `frontend/` to Vercel with framework preset `Next.js` and `NEXT_PUBLIC_API_URL=https://<your-backend-domain>`.

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service and database health check |
| `GET` | `/api/outlets` | Nalgonda Flagship metadata & partner links |
| `POST` | `/api/conventions` | Book Grand Palace Convention Hall & banquet |
| `GET` | `/api/conventions/:bookingNumber` | Fetch convention booking status |
| `POST` | `/api/reservations` | Reserve royal dining table / banquet diwan |
| `GET` | `/api/menu` | List royal feasts and culinary items |
| `GET` | `/api/orders/track/:orderNumber` | Live earthen pot cooking status simulation |

---

## 🎨 Design System & Palette

The visual identity is anchored in Rayalaseema warrior heritage:

| Token | Hex Code | Visual Identity |
| :--- | :--- | :--- |
| `palegar-bg` | `#0A0203` | Sacred Obsidian Charcoal |
| `palegar-crimson` | `#8C1824` | Guntur Sun-Dried Chilli Crimson |
| `palegar-chilli` | `#D6301D` | Searing Wood Ember Flame |
| `palegar-gold` | `#E5A93C` | Royal Nizam & Palegar Crown Gold |
| `palegar-copper` | `#C87D32` | Hand-beaten Brass & Copper Vessels |
| `palegar-lightBg` | `#FDF8F2` | Imperial Ivory Palace Sandstone |

---

## 📜 Documentation Links
- **[Production Deployment Guide](docs/DEPLOYMENT.md)**: Docker, Nginx, PM2, SSL, backups, troubleshooting.
- **[System Specifications](docs/SPEC.md)**: Functional requirements, data models, scope boundaries.
- **[Architecture Decisions](docs/DECISIONS.md)**: ADRs on aggregator rerouting, conventions, SQLite singleton.
- **[Project Memory & Incident Log](docs/MEMORY.md)**: Resolved bugs, modal layout fixes, permanent invariants.
- **[Design System Spec](docs/DESIGN.md)**: Typography, glassmorphism, animations, zero-emoji rules.

---

## 📜 License

Private & Proprietary — Developed for **Kritunga The Palegar's Cuisine (Nalgonda Flagship)**. All rights reserved.
