# KRITUNGA — The Palegar's Cuisine
### *The Royal Taste of Rayalaseema | Awwwards-Caliber Scrollytelling Experience*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-orange?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

---

## 🌶️ Overview

**KRITUNGA — The Palegar's Cuisine** is a luxury, cinematic web application that brings the fiery heritage and royal culinary traditions of Rayalaseema warlords (Palegars) to life. Built with **Next.js 14 (App Router)** and **TypeScript**, the platform merges high-converting e-commerce with immersive scrollytelling, featuring an in-place DPR-aware HTML5 canvas scrubber, sensory physics cards, interactive spice heat customizers, and seamless dual royal theming.

---

## ✨ Flagship Features

### 1. In-Place Canvas Frame-Scrubber Engine
- **240-Frame Ultra-Fluid Sequence**: Drives a high-fidelity visual breakdown of Kritunga’s authentic potli dum biryani and earthen clay pot craft.
- **DPR-Aware Rendering**: High-DPI / Retina display crispness with adaptive resolution downscaling on mobile devices.
- **Dynamic Scroll Synchronization**: Powered by `requestAnimationFrame` and normalized scroll scrub ratios for 60fps frame interpolation.

### 2. Dual Royal Theme System (Obsidian & Ivory)
- **Palegar Night**: Deep obsidian (`#0A0203`), smoldering crimson (`#8C1824`), and burnished gold (`#E5A93C`).
- **Imperial Ivory**: Regal saffron (`#FDF8F2`), ruby lacquer, and golden embroidery.
- Zero-flicker client-side persistence via React Context (`ThemeContext.tsx`).

### 3. Sensory Physics & Culinary Anatomy
- Interactive breakdown of sacred ingredients: Guntur dry red chillies, hand-pounded 21-spice potli masala, pure cow ghee, and clay pot slow-dum cooking over wood embers.
- Micro-interactions, ambient sound toggle, and spring-loaded hover cards powered by **Framer Motion**.

### 4. Signature Palegar Feast Customizer & Instant Checkout
- **Interactive Feast Builder**: Choose between Royal Mutton Dum Biryani, Natu Kodi Pulao, Gongura Mutton, and Ragi Sangati Mudda.
- **Palegar Heat Calibration**: Slider selecting spice levels from *Mild Heritage* to *Rayalaseema Fiery* and *Palegar Inferno*.
- **Celebratory Checkout Modal**: Real-time pricing calculations, quantity selectors, and instant confetti animations (`canvas-confetti`).

### 5. Floating Capsule Navigation
- Auto-tracking scroll spy pill displaying current page sections (Heritage, Crucible, Feast, Anatomy) with smooth scroll transitions.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 14** (App Router) | React framework with optimized font loading and static export readiness |
| **React 18** | UI component architecture and client-side state |
| **TypeScript** | Strict end-to-end type safety |
| **Tailwind CSS 3.4** | Utility-first styling with custom Palegar design tokens |
| **Framer Motion 11** | Orchestrated scroll reveals, spring physics, and modal transitions |
| **Canvas-Confetti** | Celebration feedback upon order confirmation |
| **Lucide React** | Clean, modern typography-first iconography |
| **Python Pillow (PIL)** | Asset optimization pipeline converting raw frames to compressed WebP |

---

## 📂 Project Structure

```bash
Kritunga Web Application/
├── app/
│   ├── globals.css              # Custom font bindings, animations & CSS variables
│   ├── layout.tsx               # Root layout, Google Fonts (Cinzel & Outfit), SEO metadata
│   ├── not-found.tsx            # Regal 404 error boundary
│   └── page.tsx                 # Core scrollytelling assembly page
├── components/
│   ├── BuyNow.tsx               # Interactive feast customizer & checkout modal
│   ├── CinematicIceSection.tsx  # Sensory crucible & spice alchemy physics cards
│   ├── Footer.tsx               # Brand editorial footer & heritage links
│   ├── Navbar.tsx               # Header with mobile drawer & audio controller
│   ├── ProductBottleScroll.tsx  # 240-frame HTML5 canvas scrubber engine
│   ├── ProductDetails.tsx       # Culinary anatomy & ingredients breakdown
│   ├── ProductTextOverlays.tsx  # Scroll-tied typography & narrative cards
│   └── SectionNav.tsx           # Floating scroll-spy navigation capsule
├── context/
│   └── ThemeContext.tsx         # Palegar Night / Imperial Ivory theme provider
├── public/
│   └── images/
│       └── kritunga/            # Optimized 240 WebP sequence frames (1.webp -> 240.webp)
├── scripts/
│   └── convert_frames.py        # Python batch optimization utility for canvas frames
├── .gitignore                   # Ignore rules for Next.js, nodes, builds, and raw dumps
├── package.json                 # Project dependencies & scripts
├── tailwind.config.js           # Custom color palettes, gradients, and font families
└── tsconfig.json                # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm** / **yarn** / **pnpm**
- **Python 3.9+** with `Pillow` (only needed if generating new WebP animation frames)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd "Kritunga Web Application"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **(Optional) Generate Optimized Frame Assets**:
   If modifying or re-exporting image sequences from raw JPEG dumps:
   ```bash
   python scripts/convert_frames.py
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🏗️ Build & Deployment

To create an optimized production build:

```bash
npm run build
npm run start
```

For static export deployment (Vercel, Cloudflare Pages, AWS S3 / CloudFront):
```bash
npx next build
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
