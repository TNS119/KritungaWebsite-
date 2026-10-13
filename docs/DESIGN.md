# UI/UX Design System & Tokens (docs/DESIGN.md)

> **Kritunga The Palegar's Cuisine — Design Specification & Token Registry**  
> *Authoritative visual design system, color tokens, typography scales, glassmorphism surfaces, canvas scrubbing physics, and UI invariants.*

---

## 1. Design Philosophy: The Palegar Royal Aesthetic

The visual language of Kritunga reflects the royal warrior legacy of the Palegars of Rayalaseema. It departs from standard modern restaurant interfaces by prioritizing atmospheric depth, authentic Indian royalty, and cinematic scrollytelling:
- **Atmospheric Palette:** Deep smoky obsidian, smoldering crimson embers, Guntur chilli scarlet, and burnished temple gold.
- **Dual Imperial Theming:** A high-contrast dark mode (*Palegar Night*) for evening luxury and an imperial ivory mode (*Saffron Palace*) for daytime clarity.
- **Physical Materiality:** Heavy earthen clay pots (*Handi*), polished copper, beaten brass, and translucent smoked glass.
- **Zero-Emoji Discipline:** Menus, buttons, tabs, modal actions, and system elements strictly use clean typographic labeling without emoji clutter.

---

## 2. Color Palette & Token System

### Dark Mode Tokens (`html.dark` — Palegar Night)
| Token Name | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `palegar.bg` | `#0A0203` | Root page background, deep obsidian void |
| `palegar.card` | `#140507` | Elevated card surfaces, earthen charcoal handi fill |
| `palegar.cardHover`| `#1D080B` | Interactive card hover state |
| `palegar.crimson` | `#8C1824` | Primary brand accent, aged royal crimson |
| `palegar.chilli` | `#D6301D` | Fiery accent, callouts, hot spice badges |
| `palegar.gold` | `#E5A93C` | Imperial gold accents, primary CTAs, active highlights |
| `palegar.goldLight`| `#F3C973` | Sunlit amber, secondary button text, gradient highlights |
| `palegar.copper` | `#C87D32` | Metallic warm highlights, borders, spices |
| `palegar.brass` | `#E6C280` | Subtle ornamental accents, icons |
| `palegar.text` | `#FFF8EE` | Primary typography, warm ivory |
| `palegar.muted` | `rgba(255, 248, 238, 0.65)` | Secondary body copy, timestamps, subtitles |
| `border-gold` | `rgba(229, 169, 60, 0.20)` | Structural borders, subtle card dividers |

### Light Mode Tokens (`html` — Saffron Palace / Imperial Ivory)
| Token Name | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `palegar.lightBg` | `#FDF8F2` | Root page background, warm imperial parchment |
| `palegar.lightCard` | `#FFFFFF` | Crisp elevated card containers |
| `palegar.lightCardHover`| `#F7EFE6` | Interactive card hover wash |
| `palegar.lightText` | `#1C0D0F` | High-contrast primary text, deep espresso |
| `palegar.lightMuted`| `#634B4E` | Secondary body copy, warm taupe |
| `palegar.lightGold` | `#B87B18` | Burnished antique gold for light backgrounds |
| `palegar.lightGoldLight`| `#D49B28` | Saffron amber highlights |
| `palegar.lightCrimson`| `#9E1B28` | Deep ruby headers and key badges |
| `palegar.lightChilli`| `#C92A1A` | Fiery red buttons and spice indicators |
| `palegar.lightBorder`| `rgba(184, 123, 24, 0.25)` | Gold hairline border dividers |

### Signature Gradients
- **`royal-gradient`:** `radial-gradient(circle at 50% 30%, rgba(140, 24, 36, 0.25) 0%, rgba(10, 2, 3, 0.95) 75%)`
- **`gold-shimmer`:** `linear-gradient(135deg, #F3C973 0%, #E5A93C 50%, #C87D32 100%)`
- **`crimson-flame`:** `linear-gradient(135deg, #FF453A 0%, #D6301D 50%, #8C1824 100%)`

### Delivery Partner Brand Colors
- **Swiggy:** `#FC8019` (Signature Swiggy Orange), badge background `rgba(252, 128, 25, 0.12)`, border `rgba(252, 128, 25, 0.35)`.
- **Zomato:** `#E23744` (Signature Zomato Red), badge background `rgba(226, 55, 68, 0.12)`, border `rgba(226, 55, 68, 0.35)`.

---

## 3. Typography Scale & Fonts

The application pairs an imperial serif for royal brand presence with an ergonomic geometric sans-serif for UI clarity:

| Role | Font Family | Variable | Weights | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Imperial Display** | `Cinzel` | `--font-cinzel` | 400, 600, 700, 900 | Brand logo, section headings, hall titles, banner titles |
| **Modern Interface** | `Outfit` | `--font-outfit` | 300, 400, 500, 600, 700, 800 | Body text, form fields, modal controls, buttons, metadata |

### Type Scale Breakdown
- **Hero Title (`H1`):** `font-cinzel font-bold text-4xl sm:text-6xl md:text-7xl tracking-wider uppercase`
- **Section Heading (`H2`):** `font-cinzel font-bold text-2xl sm:text-4xl tracking-wide uppercase text-palegar-gold`
- **Card Subheading (`H3`):** `font-cinzel font-semibold text-lg sm:text-xl text-palegar-text`
- **Body Regular:** `font-outfit font-normal text-sm sm:text-base leading-relaxed text-palegar-text/80`
- **Caption / Meta:** `font-outfit font-medium text-xs sm:text-sm tracking-wider uppercase text-palegar-muted`
- **Numeric / Prices / Codes:** `font-cinzel font-bold tracking-widest text-palegar-goldLight`

---

## 4. Surfaces, Glassmorphism & Elevation Tokens

### Glass Panels
- **Standard Glass (`.glass-panel`):**
  - Dark: `background: rgba(20, 5, 7, 0.80); backdrop-filter: blur(16px); border: 1px solid rgba(229, 169, 60, 0.20);`
  - Light: `background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); border: 1px solid rgba(184, 123, 24, 0.25);`
- **Interactive Glass Hover (`.glass-panel-hover`):**
  - Transition: `all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`
  - Dark Hover: `background: rgba(29, 8, 11, 0.92); border-color: rgba(229, 169, 60, 0.45); box-shadow: 0 10px 30px -10px rgba(214, 48, 29, 0.30);`
  - Light Hover: `background: rgba(247, 239, 230, 0.95); border-color: rgba(184, 123, 24, 0.50); box-shadow: 0 10px 30px -10px rgba(201, 42, 26, 0.15);`

### Glow Filters
- **Gold Glow (`.gold-glow`):** `text-shadow: 0 0 20px rgba(243, 201, 115, 0.40);`
- **Crimson Glow (`.crimson-glow`):** `text-shadow: 0 0 25px rgba(214, 48, 29, 0.60);`
- **Gold Border Glow (`.gold-border-glow`):** `box-shadow: 0 0 25px -5px rgba(229, 169, 60, 0.30);`

### Custom Modern Scrollbar
- Track: Completely transparent (`background: transparent`), eliminating opaque edge strips
- Thumb: Translucent antique gold pill (`rgba(184, 123, 24, 0.3)` light / `rgba(229, 169, 60, 0.3)` dark) with full pill border radius (`9999px`)
- Width: Minimal 6px width for a sleek, unobtrusive luxury feel
- Hover Thumb: Smooth opacity increase (`0.6`)
- Cross-Browser: Standard `scrollbar-width: thin` and `scrollbar-color` for Firefox support

---

## 5. Motion, Canvas Scrubbing & Animation Physics

### HTML5 Canvas Frame Scrubber (`ProductBottleScroll.tsx`)
- **Frame Sequence:** 240 WebP progressive sequence (`/images/kritunga/${i}.webp`).
- **Scrub Damping:** Fluid linear interpolation:
  $$\Delta = \text{targetProgress} - \text{currentProgress}$$
  $$\text{currentProgress} \mathrel{+}= \Delta \times 0.14$$
- **Cinematic Auto-Play Damping:**
  $$\text{step} = \text{sign}(\Delta) \times \min(|\Delta \times 0.035|, 0.0022)$$
  Maintains ~32fps continuous playback during "Unveil Feast" triggers.
- **Focal Point Clamping:** Emblem focal point locked at $x = 925 / 1920 = 0.4818$ horizontally, clamped edge-to-edge with zero black gaps.
- **DPR Scaling:** Automatic devicePixelRatio scaling:
  $$\text{scale} = \min(\text{window.devicePixelRatio} \parallel 1, 2.0)$$
  Capped at $2.0\times$ to avoid GPU memory exhaustion on 4K retina displays.

### CSS Keyframe Animations
- **`pulse-glow`:** `3s ease-in-out infinite` (scales 1.0 to 1.05 with opacity oscillation 0.4 to 0.8).
- **`float`:** `4s ease-in-out infinite` (vertical translation $0\text{px} \rightarrow -8\text{px} \rightarrow 0\text{px}$).

---

## 6. UI & Component Invariants

### 1. Zero-Emoji Invariant (Strict Rule)
- Menus, top navigation bars, right-click/context menus, modal headers, action buttons, and form tags must NEVER contain emojis.
- All actions use clean text labels (e.g. "Reserve Table", "Book Palace Hall", "Order on Swiggy", "Order on Zomato", "Explore Strongholds").
- Icons are strictly rendered via `lucide-react` vector components (e.g., `<Crown />`, `<Calendar />`, `<Users />`, `<Sparkles />`).

### 2. Modal Hierarchy & Focus Management
- Modals (`OrderPartnerModal`, `ConventionBookingModal`, `TableReservationModal`) render in portal overlays with `z-50`, backdrop blur (`backdrop-blur-md`), and explicit keyboard dismissal (`Escape`).
- Background scrolling is frozen on `document.body` while modals are active (`overflow: hidden`).

### 3. Responsive Breakpoints
- **Mobile (`< 640px`):** Single column layouts, compact bottom capsule navigation (`SectionNav`), full-width modal drawers.
- **Tablet (`640px - 1024px`):** 2-column feature grids, expanded navigation controls.
- **Desktop (`> 1024px`):** 3-column banquet hall showcase, sticky 60fps canvas sequence with floating text overlays.

---

## 7. Design System Maintenance

When modifying UI components:
- Always reference `--font-cinzel` for titles and `--font-outfit` for UI body.
- Use predefined Tailwind `palegar-*` tokens instead of arbitrary ad-hoc hex values.
- Verify color contrast in both dark (`html.dark`) and light modes.
- Keep `docs/DESIGN.md` in sync whenever new visual tokens or animation curves are introduced.
