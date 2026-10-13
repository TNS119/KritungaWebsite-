# CONTEXT.md — Architecture & File Registry

> **Notice to AI Agents:** Read this file first. Do NOT run full directory scans, global grep searches, or multi-file discovery loops. Use the file registry below to navigate directly to target files. Only open source files when surgical editing requires line-exact ranges.

---

## 1. System Architecture & High-Level Design
- **Core Purpose:** High-conversion digital brand portal, delivery aggregator gateway, table reservation engine, and enterprise convention/banquet booking platform for Kritunga The Palegar's Cuisine.
- **Architecture Pattern:** Client-Server Monorepo (Next.js 14 App Router + Node.js Express API + Prisma SQLite).
- **Core Strategy:**
  - **Delivery Aggregator Gateway:** Food delivery orders are routed directly to official partner storefronts (Swiggy & Zomato) via `OrderPartnerModal.tsx`.
  - **Direct Fine Dining Reservations:** Fast-path table reservation for dining diwans via `TableReservationModal.tsx` and `/api/reservations`.
  - **Grand Convention & Banquet Bookings:** Full-stack pipeline for booking grand palace halls, corporate banquets, and wedding receptions via `ConventionBookingSection.tsx`, `ConventionBookingModal.tsx`, and `/api/conventions`.
  - **Omnichannel WhatsApp Dispatch:** Real-time customer confirmation links generated via `WhatsAppService`.

---

## 2. File-Level Architecture Registry

| File Path | Role & Responsibility | Key Classes / Exports | Upstream / Downstream | Invariants & Constraints |
| :--- | :--- | :--- | :--- | :--- |
| `backend/src/server.ts` | Express API entrypoint, CORS configuration, and route mounter | Express app instance, `/api/*` routes | Upstream: Frontend fetch client<br>Downstream: Express route handlers | Non-blocking handlers; graceful JSON error handling with 500/404 fallbacks. |
| `backend/src/routes/convention.routes.ts` | Convention & banquet booking REST endpoints | Express Router (`/api/conventions`) | Upstream: `backend/src/server.ts`<br>Downstream: Prisma client, `WhatsAppService` | Generates unique `CNV-XXXX` reference codes; requires organizer name, phone, date, and guests. |
| `backend/src/routes/reservation.routes.ts` | Table dining reservation REST endpoints | Express Router (`/api/reservations`) | Upstream: `backend/src/server.ts`<br>Downstream: Prisma client, `WhatsAppService` | Generates `RES-XXXX` codes; preserves table booking continuity. |
| `backend/src/routes/order.routes.ts` | Order API endpoints and legacy tracking integration | Express Router (`/api/orders`) | Upstream: `backend/src/server.ts`<br>Downstream: Prisma client | Maintained for legacy API clients and outlet metadata lookups. |
| `backend/src/routes/tracking.routes.ts` | Dum preparation live tracking simulation | Express Router (`/api/orders/track/:orderNumber`) | Upstream: `backend/src/server.ts`<br>Downstream: Prisma client | Multi-stage simulation (Dum Earthen Handi -> Packing -> Dispatch -> Delivered). |
| `backend/src/routes/menu.routes.ts` | Menu item query endpoints | Express Router (`/api/menu`) | Upstream: `backend/src/server.ts`<br>Downstream: Prisma client | Read-only item catalog. |
| `backend/src/services/db.service.ts` | Prisma Client singleton provider | `prisma` | Upstream: All route handlers<br>Downstream: SQLite database (`dev.db`) | Global singleton pattern to prevent connection leaks during hot reloading. |
| `backend/src/services/whatsapp.service.ts` | WhatsApp confirmation builder & dispatcher | `WhatsAppService`, `buildConventionMessage()` | Upstream: Route controllers<br>Downstream: Meta Cloud API / `wa.me` links | Zero-cost click-to-chat fallback whenever Cloud API keys are absent. |
| `backend/prisma/schema.prisma` | Database schema definitions & migrations | Models: `Outlet`, `MenuItem`, `Order`, `OrderItem`, `Reservation`, `ConventionBooking` | Upstream: Prisma CLI (`db:push`)<br>Downstream: Generated `@prisma/client` | Strict relational integrity with foreign keys to `Outlet`. |
| `frontend/app/page.tsx` | Main application landing page orchestrator | `Home` component | Upstream: Next.js App Router<br>Downstream: All UI sections and modals | Coordinates state for `OrderPartnerModal`, `ConventionBookingModal`, and `TableReservationModal`. |
| `frontend/components/Navbar.tsx` | Fixed brand navigation bar with theme & modal triggers | `Navbar` component | Upstream: `frontend/app/page.tsx`<br>Downstream: `ThemeContext` | Zero emojis in menus/buttons; dynamic backdrop blur on scroll; delegates modal triggers to parent page orchestrator. |
| `frontend/components/OrderPartnerModal.tsx` | Swiggy and Zomato delivery partner modal for Kritunga Nalgonda | `OrderPartnerModal` component | Upstream: `Navbar`, `ProductTextOverlays`, `BuyNow`<br>Downstream: External partner URLs | Dedicated to Kritunga Nalgonda with official SVG brand vector logos; zero city selector clutter. |
| `frontend/components/ConventionBookingSection.tsx` | Palace Convention & Banquet Hall showcase with embedded direct booking form | `ConventionBookingSection` component | Upstream: `frontend/app/page.tsx`<br>Downstream: `frontend/services/api.ts`, `ConventionBookingModal` | Direct in-page booking inquiry with hall select, guest slider, catering style, confetti & WhatsApp concierge. |
| `frontend/components/ConventionBookingModal.tsx` | Interactive convention & banquet hall reservation modal | `ConventionBookingModal` component | Upstream: `Navbar`, `ConventionBookingSection`<br>Downstream: `frontend/services/api.ts` | Locked exclusively to Kritunga Nalgonda Flagship venue; two-layer architecture guaranteeing scrollbar stays strictly inside the box. |
| `frontend/components/TableReservationModal.tsx` | Regal dining table booking modal | `TableReservationModal` component | Upstream: `frontend/app/page.tsx`<br>Downstream: `frontend/services/api.ts` | Locked exclusively to Kritunga Nalgonda Flagship venue badge; pinned header with scrollable body inside box; root-level mounting prevents viewport clipping. |
| `frontend/components/SpiceIcon.tsx` | Dedicated Rayalaseema spice pod vector icon | `SpiceIcon` component | Upstream: `SectionNav`, `CinematicIceSection`<br>Downstream: SVG rendering | Replaced generic sparkles with authentic spice icon across the application. |
| `frontend/components/BuyNow.tsx` | Signature Palegar Feast Pack customizer with partner CTAs | `BuyNow` component | Upstream: `frontend/app/page.tsx`<br>Downstream: `OrderPartnerModal` | Direct Swiggy/Zomato navigation; visual dish photography with clean title and included feast items. |
| `frontend/components/ProductBottleScroll.tsx` | Flagship DPR-aware HTML5 canvas frame sequence scrubber | `ProductBottleScroll` component | Upstream: `frontend/app/page.tsx`<br>Downstream: `ProductTextOverlays` | Smooth scrub driven by page scroll; yields wheel and touch events when any modal is open. |
| `frontend/components/ProductTextOverlays.tsx` | Floating hero copy and action buttons over canvas | `ProductTextOverlays` component | Upstream: `ProductBottleScroll`<br>Downstream: `onOpenOrderModal` | Scroll-dissolving typography and CTA triggers; elevated mobile buttons (pb-16) to eliminate overlap with Scroll to Unveil. |
| `frontend/components/ProductDetails.tsx` | Royal heritage recipes, ancestral cooking pillars, and taste standards | `ProductDetails` component | Upstream: `frontend/app/page.tsx`<br>Downstream: None | User-friendly royal Palegar culinary cards and taste standards. |
| `frontend/components/CinematicIceSection.tsx` | Ancestral culinary traditions and Rayalaseema spice showcase | `CinematicIceSection` component | Upstream: `frontend/app/page.tsx`<br>Downstream: None | High-resolution culinary photos of traditions and dishes with concise single-sentence notes. |
| `frontend/components/SectionNav.tsx` | Floating bottom capsule navigation pill | `SectionNav` component | Upstream: `frontend/app/page.tsx`<br>Downstream: None | Quick-jump anchor links using `SpiceIcon` for Flavors. |
| `frontend/components/Footer.tsx` | Brand editorial footer with Nalgonda Flagship directory | `Footer` component | Upstream: `frontend/app/page.tsx`<br>Downstream: None | Social links, legal disclaimers, and dedicated Kritunga Nalgonda Flagship contact and partner links. |
| `frontend/services/api.ts` | Type-safe frontend API client | `api`, `createConventionBooking()` | Upstream: Frontend components<br>Downstream: Next.js rewrite proxy (`/api/*`) | Handles orders, reservations, and conventions with full TypeScript typings. |
| `docs/DESIGN.md` | Authoritative UI/UX tokens, typography scales, glassmorphism, canvas physics, and invariants | Design system specification | Upstream: Frontend components & Tailwind<br>Downstream: UI implementation | Strict zero-emoji discipline in menus/buttons; Palegar royal aesthetic. |
| `docs/SPEC.md` | Technical project specification & scope boundaries | Functional requirements (FR-01 to FR-04) | Upstream: Architecture & Stakeholders<br>Downstream: Implementation milestones | Strict scope boundaries; Swiggy/Zomato delivery delegation vs direct banquets. |
| `docs/DECISIONS.md` | Architecture Decision Records (ADRs) | ADR-001 (Delivery Aggregator vs In-House Fleet) | Upstream: Technical leadership<br>Downstream: Feature roadmap | Documents architectural choices and rejected alternatives. |
| `docs/MEMORY.md` | Incident log, post-mortems, root-cause analyses, and permanent invariants | Operational memory | Upstream: Resolved runtime errors & bugs<br>Downstream: Engineering invariants | Guarantees permanent anti-recurrence for canvas, prisma, and proxy fixes. |
| `docs/DEPLOYMENT.md` | Comprehensive production deployment guide | Docker, Vercel/Render, PM2+Nginx specs | Upstream: DevOps / Sysadmin<br>Downstream: Cloud environments | Covers Docker Compose, PaaS decoupled setups, VPS with PM2, and SSL. |
| `ecosystem.config.js` | PM2 process manager configuration | `kritunga-backend`, `kritunga-frontend` | Upstream: Host OS / PM2 CLI<br>Downstream: Node.js runtimes | Configured for zero-downtime cluster/single worker operation on Linux VPS. |
| `docker-compose.yml` | Production container orchestration | Services: `backend`, `frontend` | Upstream: Docker Engine<br>Downstream: Persistent volume `backend-data` | Includes active HTTP healthchecks and service readiness dependencies. |

---

## 3. Component Relationships & Data Contracts
- **Primary Data Models:**
  - `ConventionBooking`: `{ id, bookingNumber, organizerName, organizerPhone, organizerEmail, companyName, eventType, hallPreference, expectedGuests, eventDate, timeSlot, cateringPreference, additionalServices, specialRequests, status, estimatedBudget, createdAt }`
  - `Reservation`: `{ id, bookingNumber, outletId, guestName, guestPhone, partySize, reservationDate, timeSlot, tableType, specialRequests, status }`
  - `Order`: `{ id, orderNumber, outletId, customerName, customerPhone, deliveryAddress, status, totalAmount, paymentStatus }`
- **Internal APIs:**
  - `GET /health` & `GET /api/health`: Production database connectivity and uptime check.
  - `POST /api/conventions`: Accepts `ConventionPayload`, stores in DB, returns `ConventionResponseData` with `whatsappUrl`.
  - `GET /api/conventions/:bookingNumber`: Retrieves full convention booking dossier.
  - `POST /api/reservations`: Reserves dining table, returns `ReservationResponseData`.

---

## 4. Current State & Active Milestone
- **Active Focus:** Production-ready and deployment-ready architecture. Full-stack verified with zero build errors.
- **Recent Refactors:**
  - Hardened `backend/src/server.ts` with reverse proxy trust (`trust proxy`), multi-domain CORS origin parser, production security headers (`HSTS`, `X-Content-Type-Options`, `X-Frame-Options`), live database health check (`prisma.$queryRaw`), and graceful shutdown listeners (`SIGTERM`, `SIGINT`).
  - Updated `frontend/next.config.mjs` with production compression, security headers, and removed power headers.
  - Adapted `frontend/services/api.ts` to seamlessly handle both same-domain proxying and remote `NEXT_PUBLIC_API_URL` endpoints across SSR and browser contexts.
  - Generated production environment templates (`.env.example`, `frontend/.env.example`, `backend/.env.example`).
  - Added Linux VPS PM2 configuration (`ecosystem.config.js`) and hardened `docker-compose.yml` with healthchecks and persistent SQLite volume.
  - Authored full production deployment manual in `docs/DEPLOYMENT.md`.
- **Known Constraints / Debt:** None. Monorepo builds cleanly across both workspaces (`npm run build:backend` and `npm run build:frontend`).

