# KRITUNGA — The Palegar's Cuisine
### *The Royal Taste of Rayalaseema | Awwwards-Caliber Scrollytelling Monorepo*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-orange?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

---

## 🌶️ Overview

**KRITUNGA — The Palegar's Cuisine** is structured as an enterprise-grade monorepo featuring a decoupled **Next.js 14 Frontend** and an **Express + TypeScript Backend API**. The platform merges high-converting e-commerce with immersive scrollytelling, featuring an in-place DPR-aware HTML5 canvas scrubber, sensory physics cards, interactive spice heat customizers, real-time order processing, and dual royal theming.

---

## 📂 Architecture & Directory Structure

```bash
Kritunga Web Application/
├── backend/                     # Node.js + Express (TypeScript) API Service
│   ├── src/
│   │   ├── controllers/         # Request handling & validations
│   │   ├── data/menuData.ts     # Palegar feasts, pricing & spice profiles
│   │   ├── routes/
│   │   │   ├── menu.routes.ts   # GET /api/menu & GET /api/menu/:id
│   │   │   ├── order.routes.ts  # POST /api/orders & GET /api/orders/:id
│   │   │   └── reservation.routes.ts # POST /api/reservations
│   │   ├── types/               # Backend data schemas & request contracts
│   │   └── server.ts            # Express server, CORS & health endpoints
│   ├── .env.example             # Backend environment variable template
│   ├── package.json             # Backend dependencies & build scripts
│   └── tsconfig.json            # Backend TypeScript configuration
│
├── frontend/                    # Next.js 14 App Router Client
│   ├── app/
│   │   ├── globals.css          # Custom font bindings, animations & CSS variables
│   │   ├── layout.tsx           # Google Fonts (Cinzel & Outfit), SEO metadata
│   │   ├── not-found.tsx        # Regal 404 error boundary
│   │   └── page.tsx             # Core scrollytelling assembly page
│   ├── components/
│   │   ├── BuyNow.tsx           # Interactive feast customizer & checkout modal
│   │   ├── CinematicIceSection.tsx # Sensory crucible & spice alchemy physics cards
│   │   ├── Footer.tsx           # Brand editorial footer & heritage links
│   │   ├── Navbar.tsx           # Header with mobile drawer & audio controller
│   │   ├── ProductBottleScroll.tsx # 240-frame HTML5 canvas scrubber engine
│   │   ├── ProductDetails.tsx   # Culinary anatomy & ingredients breakdown
│   │   ├── ProductTextOverlays.tsx # Scroll-tied typography & narrative cards
│   │   └── SectionNav.tsx       # Floating scroll-spy navigation capsule
│   ├── context/
│   │   └── ThemeContext.tsx     # Palegar Night / Imperial Ivory theme provider
│   ├── data/
│   │   └── products.ts          # Frontend feast packs & milestone narratives
│   ├── public/
│   │   └── images/kritunga/     # 240 WebP canvas sequence frames (1.webp -> 240.webp)
│   ├── next.config.mjs          # Next.js bundler configuration
│   ├── tailwind.config.js       # Custom Palegar tokens, colors & gradients
│   ├── tsconfig.json            # Frontend TypeScript configuration
│   └── package.json             # Frontend client dependencies
│
├── scripts/
│   └── convert_frames.py        # Python batch optimization utility for canvas frames
├── .gitignore                   # Workspace-wide ignore rules for Next.js, Node, and dist
├── package.json                 # Monorepo root workspace orchestrator
└── README.md                    # System documentation & developer guide
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm** (v7+ with workspace support)

### Installation
From the root directory, install all dependencies across both workspaces in a single command:

```bash
npm install
```

---

## ⚡ Running Locally

### Single-Command Startup (Concurrent)
Launch both the **Next.js Frontend** (`:3000`) and the **Express Backend** (`:5000`) simultaneously:

```bash
npm run dev
```

### Individual Service Commands
If you wish to run services individually:

```bash
# Run Frontend Only (http://localhost:3000)
npm run dev:frontend

# Run Backend API Only (http://localhost:5000)
npm run dev:backend
```

---

## 📡 Backend API Endpoints

The backend runs on `http://localhost:5000`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & service heartbeat |
| `GET` | `/api/menu` | List all royal feast packages and spice specifications |
| `GET` | `/api/menu/:id` | Fetch specific feast package details by ID |
| `POST` | `/api/orders` | Place a royal banquet order with items, spice heat, and delivery address |
| `GET` | `/api/orders/:id` | Query order status and delivery tracking |
| `POST` | `/api/reservations` | Reserve a royal dining table / banquet diwan |

---

## 🏗️ Production Builds

To compile and verify all workspaces for production:

```bash
# Build both frontend and backend
npm run build

# Or build individually
npm run build:frontend
npm run build:backend
```

---

## 🎨 Design System & Palette

The design aesthetic is anchored around the royal war banners and earthen cooking methods of Rayalaseema:

| Token | Hex Code | Visual Identity |
| :--- | :--- | :--- |
| `palegar-bg` | `#0A0203` | Sacred Obsidian Charcoal |
| `palegar-crimson` | `#8C1824` | Guntur Sun-Dried Chilli Crimson |
| `palegar-chilli` | `#D6301D` | Searing Wood Ember Flame |
| `palegar-gold` | `#E5A93C` | Royal Nizam & Palegar Crown Gold |
| `palegar-copper` | `#C87D32` | Hand-beaten Brass & Copper Vessels |
| `palegar-lightBg` | `#FDF8F2` | Imperial Ivory Palace Sandstone |

---

## 📜 License

Private & Proprietary — Developed for **Kritunga The Palegar's Cuisine**. All rights reserved.
