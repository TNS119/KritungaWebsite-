# Project Memory & Incident Log (docs/MEMORY.md)

> **Kritunga The Palegar's Cuisine — Architectural Incident Log & Permanent Invariants**  
> *Post-mortems, root-cause analyses, resolved edge cases, and architectural invariants to guarantee permanent anti-recurrence.*

---

## [2026-10-10]: Canvas Frame Sequence Memory Pressure on Retina Displays

### Problem:
During rapid scroll scrubbing on high-DPI displays (MacBook Retina, 4K monitors), the canvas element exhibited micro-stutter and occasional GPU memory warnings.

### Cause:
The canvas backbuffer was multiplying canvas width and height by unconstrained `window.devicePixelRatio` (which can reach $3.0\times$ or $4.0\times$), generating huge pixel buffers for each frame render cycle.

### Learning:
Retina displays above $2.0\times$ devicePixelRatio offer diminishing visual returns for 1080p photographic canvas frames while consuming exponentially more memory ($\text{width} \times \text{height} \times 4\text{ bytes}$).

### Action Taken:
Applied a hard ceiling to DPR in [`ProductBottleScroll.tsx`](file:///c:/Users/nikhi/Downloads/Kritunga%20Web%20Application/frontend/components/ProductBottleScroll.tsx):
```typescript
const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
```

### Permanent Invariants:
- Never allow unconstrained `window.devicePixelRatio` on full-viewport HTML5 canvas scrubbers. Always clamp at $2.0\times$.
- Frame sequence assets must remain WebP formatted with width capped to 1920px.

---

## [2026-10-11]: Prisma Client Connection Multiplying in SQLite Hot Reload

### Problem:
Running backend dev mode with `tsx watch` resulted in SQLite `SQLITE_BUSY: database is locked` exceptions after multiple file edits.

### Cause:
Every time tsx or ts-node hot-reloads a file that imports `new PrismaClient()`, a new database connection handle was created against SQLite's single-writer database file.

### Learning:
SQLite is an embedded single-file database that handles concurrent readers well, but locks on concurrent write transactions across multiple unconnected clients.

### Action Taken:
Established a persistent Prisma Client singleton in [`backend/src/services/db.service.ts`](file:///c:/Users/nikhi/Downloads/Kritunga%20Web%20Application/backend/src/services/db.service.ts) using `globalThis.prisma`:
```typescript
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient({ log: ['error', 'warn'] });
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### Permanent Invariants:
- All database operations across all route handlers MUST import the singleton `prisma` instance from `backend/src/services/db.service.ts`.
- Never instantiate `new PrismaClient()` directly inside route controllers or utility files.

---

## [2026-10-12]: Next.js Theme Hydration Mismatch

### Problem:
Console warnings `Warning: Extra attributes from the server: class` occurred on initial page load when dark mode was hydrated from `localStorage`.

### Cause:
The server renders HTML with a default fallback theme string before client JavaScript executes and reads the user's preferred theme from `localStorage`.

### Learning:
Next.js App Router enforces strict server-to-client DOM tree matching on the root `<html>` tag.

### Action Taken:
1. Injected `suppressHydrationWarning` on `<html lang="en" className="dark ...">` in [`frontend/app/layout.tsx`](file:///c:/Users/nikhi/Downloads/Kritunga%20Web%20Application/frontend/app/layout.tsx).
2. Hardened `ThemeProvider` with an initial mount check before applying dynamic DOM mutations.

### Permanent Invariants:
- Always preserve `suppressHydrationWarning` on the root `<html>` tag in `frontend/app/layout.tsx`.

---

## [2026-10-13]: Production Reverse Proxy IP Stripping & Multi-Domain CORS

### Problem:
In containerized environments (Docker Compose / Nginx reverse proxy), rate limiting, client IP detection, and CORS headers broke when requests arrived from custom domains or subdomains.

### Cause:
Express does not trust `X-Forwarded-For` and `X-Forwarded-Proto` headers by default unless proxy trust is explicitly configured. Furthermore, static CORS strings failed when staging and production domains differed.

### Learning:
Production Node.js services behind load balancers or reverse proxies must explicitly trust front-facing hops and parse dynamic environment lists for CORS origins.

### Action Taken:
Hardened [`backend/src/server.ts`](file:///c:/Users/nikhi/Downloads/Kritunga%20Web%20Application/backend/src/server.ts):
1. Configured `app.set('trust proxy', 1)`.
2. Implemented dynamic comma-separated CORS parser supporting localhost, Vercel, and custom domains with `credentials: true`.
3. Injected production security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `HSTS`).

### Permanent Invariants:
- Express backend must always maintain `trust proxy: 1`.
- CORS configuration must accept multiple comma-separated URLs via `CORS_ORIGIN` env variable.

---

## [2026-10-13]: WhatsApp Zero-Cost Click-to-Chat Fallback

### Problem:
Relying solely on Meta Cloud API for booking receipts caused failures in local development and staging environments lacking verified Meta Business credentials.

### Cause:
Enterprise WhatsApp Business API requires phone number registration, Meta app review, and paid API credits.

### Learning:
Reservation confirmation UX must never fail simply because an outbound webhook or cloud messaging credential is missing.

### Action Taken:
Engineered a fail-safe dual dispatch system in [`backend/src/services/whatsapp.service.ts`](file:///c:/Users/nikhi/Downloads/Kritunga%20Web%20Application/backend/src/services/whatsapp.service.ts):
- Attempts Cloud API if `WHATSAPP_TOKEN` and `WHATSAPP_PHONE_ID` are present.
- Always generates an authenticated, pre-formatted `https://wa.me/` direct click-to-chat URL returned directly in the JSON response (`booking.whatsappUrl`).
- Frontend modal triggers celebratory confetti and offers a direct 1-tap WhatsApp launch button.

### Permanent Invariants:
- Convention and table reservation responses must always provide a valid `whatsappUrl` fallback regardless of external API configuration status.

---

## [2026-10-13]: Modal Scroll Chaining & Hero Canvas Scrubber Interception Collision

### Problem:
When any modal or popup window (`OrderPartnerModal`, `TableReservationModal`, `ConventionBookingModal`) was open, attempting to scroll inside the modal caused the background canvas sequence frames to scrub through rather than scrolling the modal content. Only after the canvas scrubber reached frame completion did the modal begin scrolling.

### Cause:
The hero canvas scrubber in [`ProductBottleScroll.tsx`](file:///c:/Users/nikhi/Downloads/Kritunga%20Web%20Application/frontend/components/ProductBottleScroll.tsx) registered non-passive `wheel` and `touchmove` listeners on `window`. When `window.scrollY <= 2`, it called `e.preventDefault()` on all wheel events and incrementally scrubbed `targetProgressRef.current` until progress reached 1.0. Because the modals did not isolate wheel events or lock body scrolling, every scroll gesture inside a modal was intercepted by the hero canvas scrubber.

### Learning:
Global event interceptors (especially non-passive wheel/touch listeners driving scrollytelling canvas engines) must never operate blindly across the viewport. They must actively detect open modal dialogs and yield execution immediately. Furthermore, all modal dialogs must enforce standard body scroll locking and overscroll containment.

### Action Taken:
1. **Scrubber Modal Awareness:** Added `isModalActive` in [`ProductBottleScroll.tsx`](file:///c:/Users/nikhi/Downloads/Kritunga%20Web%20Application/frontend/components/ProductBottleScroll.tsx) that immediately yields (`return`) without calling `e.preventDefault()` if `document.body.classList.contains('modal-open')`, `document.body.style.overflow === 'hidden'`, or the target element is within a modal dialog (`role="dialog"`, `data-modal="true"`, or `.fixed.inset-0`).
2. **Body Scroll Lock:** Added `useEffect` in all modal components to lock `document.body.style.overflow = 'hidden'` and add `modal-open` class while open, cleanly restoring previous styles on unmount or close.
3. **Event Containment:** Added `onWheel={(e) => e.stopPropagation()}` and `overscroll-contain` to modal containers so wheel and touch gestures stay isolated within the active modal.

### Permanent Invariants:
- `ProductBottleScroll.tsx` must never intercept wheel or touch events when any modal dialog is open or when event targets originate within a modal/overlay.
- All modal dialogs must enforce `modal-open` class, `body.style.overflow = 'hidden'`, and `overscroll-contain`.

---

## [2026-10-13]: Modal Scrollbar Escaping Dialog Box & Out-of-Bounds Overflow

### Problem:
In `ConventionBookingModal.tsx`, the scrollbar appeared outside the modal boundary on the browser window margin, allowing the inner content to overflow visually outside the rounded card borders.

### Cause:
The outer modal overlay had `overflow-y-auto` while the inner dialog card had an unconstrained height. The entire modal card was scrolling inside the overlay instead of having an internal scroll container inside the card itself.

### Learning:
Modal dialogs with extensive forms must employ a two-layer shell architecture:
1. Outer backdrop: pure fixed centering overlay (`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4`).
2. Inner dialog shell: height-bounded flex container (`max-h-[90vh] flex flex-col overflow-hidden`).
3. Dedicated pinned header (`shrink-0 border-b`) with title and close button.
4. Internal scroll body (`overflow-y-auto custom-modal-scroll flex-1`) strictly containing the scrollbar inside the card.

### Action Taken:
Applied the two-layer shell architecture to `ConventionBookingModal.tsx` and custom scrollbar classes (`custom-modal-scroll`) in `globals.css`.

### Permanent Invariants:
- All modal dialogs must maintain a pinned header and keep scrollable content strictly inside an inner `flex-1 overflow-y-auto` card container. Never allow outer overlay scrolling to displace modal dialog cards.

---

## [2026-10-13]: Table Reservation Modal Viewport Clipping & Fixed Header Stacking Context Collision

### Problem:
When opening the table reservation modal from the navbar, the top half of the modal (including the title, crown emblem, and close button) was pushed off the top of the viewport. Only the middle inputs (`RESERVATION DATE` and `DINING SLOT`) were visible, and the modal could not be closed.

### Cause:
1. `TableReservationModal` was mounted inside `<header>` in `Navbar.tsx`. The `<header>` element has `position: fixed` and transition/transform animations. In CSS, transforms on ancestor elements create a new containing block for `position: fixed` children, distorting viewport calculations.
2. The modal card lacked a constrained height and used flex centering on an overflowing parent, pushing the top of the card into negative viewport coordinates.

### Learning:
Modal overlays must never be rendered as children of fixed, transformed, or filtered navigation headers. Modals must always mount at the root page level.

### Action Taken:
1. Lifted `<TableReservationModal>` out of `Navbar.tsx` and mounted it at the root `<main>` level in `frontend/app/page.tsx` alongside `ConventionBookingModal` and `OrderPartnerModal`.
2. Passed callback prop `onOpenReservationModal` from `page.tsx` to `Navbar.tsx`.
3. Re-architected `TableReservationModal.tsx` to use the pinned header (`shrink-0 border-b`) and `max-h-[92vh] flex flex-col overflow-hidden` pattern with `min={todayStr}` date validation.

### Permanent Invariants:
- All modal dialogs must be mounted at the root level of `page.tsx`, never nested within `<header>`, `<nav>`, or transformed containers.
- Form inputs for future reservations must always apply `min` date restrictions.

---

## [2026-10-15]: Automated Monorepo CI/CD Build Order & Free-Tier Cold-Start Heartbeat

### Problem:
Deployments hosted on free-tier container platforms (e.g., Render, Koyeb) automatically hibernate after 15 minutes of inbound HTTP inactivity. When a new user clicked "Table Booking" or "Convention Booking", the backend required 30–60 seconds to spin up, leading to frontend timeout errors or perceptions of a broken application. Furthermore, builds in CI failed if `prisma generate` was not run prior to compiling Next.js and Express.

### Cause:
1. Next.js and TypeScript compiler require the generated `@prisma/client` types to exist in `node_modules` during static generation and build validation. In clean CI environments (`npm ci`), the generated artifacts do not exist until explicitly triggered.
2. Free-tier cloud providers implement aggressive scale-to-zero policies to conserve computing resources.

### Learning:
1. In monorepo CI workflows with Prisma, generating the database client (`npx prisma generate`) is a mandatory prerequisite before running `build:backend` or `build:frontend`.
2. A lightweight, scheduled GitHub Actions cron job executing every 12 minutes (`*/12 * * * *`) keeps free-tier backends warm at zero operational cost without hitting hibernation limits.

### Action Taken:
Authored [`.github/workflows/ci-cd.yml`](file:///c:/Users/nikhi/Downloads/Kritunga%20Web%20Application/.github/workflows/ci-cd.yml) with two distinct jobs:
1. `validate-and-build`: Executes on push/PR to `main`, runs `npm ci`, generates Prisma types via `npx prisma generate`, and compiles backend (`tsc`) and frontend (`next build`).
2. `keep-alive-heartbeat`: Executes on cron schedule every 12 minutes, safely pinging `${{ secrets.PRODUCTION_BACKEND_URL }}/api/health` with a curl timeout fallback.

### Permanent Invariants:
- All CI/CD build scripts must invoke `npx prisma generate` in `./backend` before executing `npm run build`.
- The `/api/health` endpoint must remain lightweight and fast, returning standard `{ status: 'healthy' }` JSON without blocking transactions.

---

## [2026-10-15]: AWS EC2 t2.micro Out-Of-Memory (OOM) During Next.js Production Build

### Problem:
Attempting to run `npm run build` or `docker compose up --build` on an AWS Free-Tier `t2.micro` or `t3.micro` EC2 instance crashes with error `FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory` or the process is killed abruptly by the Linux kernel OOM killer (`Killed`).

### Cause:
`t2.micro` and `t3.micro` EC2 instances have only 1 GB of physical RAM. Next.js 14 production builds compile TypeScript, minify code chunks, and render static HTML/RSC pages, which briefly requires 1.5 GB to 1.8 GB of peak memory.

### Learning:
While `1 GB` RAM is insufficient for compiling Next.js directly on the host, `1 GB` RAM is more than enough to **run** the pre-compiled Node.js Express server (~120 MB) and Next.js standalone runner (~180 MB) simultaneously in production.

### Action Taken:
Documented two architectural solutions in [docs/DEPLOYMENT.md](file:///c:/Users/nikhi/Downloads/Kritunga%20Web%20Application/docs/DEPLOYMENT.md):
1. **Swap Memory Buffer:** Configure a 2 GB to 4 GB Linux swapfile on the EC2 instance before building:
   ```bash
   sudo fallocate -l 3G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
   ```
2. **Pre-Built Containers:** Build production Docker containers via GitHub Actions or locally, and push to container registry (AWS ECR / Docker Hub), allowing the EC2 instance to execute `docker compose up -d` with zero on-server build spikes.

### Permanent Invariants:
- Any single-node VPS with $\le 2\text{ GB}$ RAM must have a minimum 2 GB swapfile active before running local npm/docker builds.

---

## [2026-10-15]: User Detail & Address Standardization to Reference Templates

### Problem:
Hardcoded sample names (`e.g. Vikramaditya`, `e.g. Maharajah Vikramaditya`), organization titles (`e.g. Rayala Heritage Trust`), and unbracketed addresses caused users to mistake placeholder examples for live customer bookings or uncustomized production data.

### Cause:
Placeholders were drafted using concrete names rather than clear, generalized reference templates.

### Learning:
Hospitality and commercial booking forms require distinct, bracketed reference templates (`e.g. [Guest Name]`, `e.g. [Organizer Full Name]`, `e.g. [name@domain.com]`, `[Chandanapalli / Landmark], Hyderabad Road, Nalgonda, Telangana - 508001`) that guide user input without being misconstrued as real data.

### Action Taken:
Replaced all sample names, phone inputs, email addresses, organization placeholders, special requests descriptions, and branch addresses across `TableReservationModal.tsx`, `ConventionBookingModal.tsx`, `ConventionBookingSection.tsx`, `Footer.tsx`, `OrderPartnerModal.tsx`, and `backend/prisma/seed.ts` with standardized bracketed reference templates.

### Permanent Invariants:
- Never use concrete individual names as placeholders in customer-facing booking forms; always use bracketed reference templates.


