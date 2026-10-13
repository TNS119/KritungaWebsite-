# Project Specification & Scope (docs/SPEC.md)

## 1. Project Objective & Vision
Kritunga The Palegar's Cuisine is a digital brand and hospitality experience designed to celebrate authentic Rayalaseema culinary traditions, dedicated to the **Kritunga Nalgonda Flagship** outlet. The platform balances high-conversion digital experiences with operational realities by:
1. **Delegating On-Demand Delivery to Aggregators:** Rerouting digital food orders seamlessly to official partner storefronts (**Swiggy** & **Zomato**) with verified Nalgonda restaurant links where logistics, fleet dispatch, and live radius validation are already battle-tested.
2. **Preserving Fine Dining Reservations:** Providing an in-house, zero-friction Table Reservation engine for royal diwans and banquet seating with automated WhatsApp confirmation.
3. **Royal Convention & Banquet Booking:** Operating an enterprise convention hall & event booking system (both UI showcase & backend transaction pipeline) enabling guests to book the 100-capacity Grand Convention Hall, corporate galas, and family banquets with Rayalaseema culinary catering.

## 2. In-Scope vs Out-of-Scope

### In-Scope (Production Release)
- **Official Delivery Partner Gateway (`OrderPartnerModal.tsx` & Direct Shortcuts):**
  - When any "Order", "Order Feast", or "Order Now" button is clicked, present an elegant modal offering direct navigation to Kritunga Nalgonda on Swiggy and Zomato.
  - Direct 1-click shortcut buttons in `BuyNow.tsx` leading directly to the verified store URLs:
    - Swiggy: `https://www.swiggy.com/city/nalgonda/kritunga-restaurant-chandanapalli-rest1223831?source=sharing`
    - Zomato: `https://www.zomato.com/nalgonda/kritunga-nalgonda-locality/order`
  - Decommissioned internal simulated payment checkout in `BuyNow.tsx` in favor of delivery aggregator navigation.
- **Table Reservation Engine (`TableReservationModal.tsx`):**
  - Royal Palegar Diwan table booking modal mounted at root `<main>` level in `page.tsx` with pinned header and internal scrollbar.
  - Dedicated to Kritunga Nalgonda Flagship with date selection (`min={today}`), dining slot, seating ambience, and instant WhatsApp booking confirmation.
- **Royal Convention Booking UI (`ConventionBookingSection.tsx` & `ConventionBookingModal.tsx`):**
  - Placed before Footer (`id="conventions"`) and linked via Navbar and SectionNav.
  - Dedicated to the *Grand Palegar Convention Hall (Max 100 Guests capacity)* at Nalgonda Flagship.
  - Comprehensive booking form capturing Organizer Name, Phone, Email, Event Type, Date, Session/Time Slot, Guest Count (10-100), Catering Style, Add-on Services, and Special Requests.
  - Submission confirmation screen displaying reference `#CNV-XXXX`, status badge, and WhatsApp Concierge dispatch link.
- **Convention Booking Backend Pipeline:**
  - Prisma Schema: `ConventionBooking` model connected with `Outlet`.
  - Express API route `/api/conventions` (`POST` booking creation, `GET` list, `GET /:bookingNumber` inquiry, `PATCH /:bookingNumber/status` status update).
  - WhatsApp notification formatting via `WhatsAppService.buildConventionMessage`.
  - Type-safe frontend client integration in `frontend/services/api.ts`.
- **AI Agent Protocol & Documentation:**
  - Continuous alignment with `tns-agents-markdown-skill` (`AGENTS.md`, `CONTEXT.md`, `docs/SPEC.md`, `docs/DECISIONS.md`, `docs/DEPLOYMENT.md`, `docs/MEMORY.md`).

### Out-of-Scope (Deferred to Future Iterations)
- Direct in-house payment gateway integration (Razorpay/Stripe) for takeaway orders (avoided per user request in favor of Swiggy/Zomato).
- Multi-city selector dropdowns (eradicated; website is native to Kritunga Nalgonda).

## 3. Functional Requirements

### FR-01: Delivery Partner Rerouting
- **Trigger:** Click on any Order CTA in `Navbar`, `ProductTextOverlays`, or `BuyNow`.
- **UI:** A dual-card modal featuring official Swiggy (Orange) and Zomato (Red) brand aesthetics with clear call-to-actions, opening official partner storefronts for Nalgonda in a new tab.

### FR-02: Table Reservation Integrity
- Dedicated `TableReservationModal.tsx` locked to Nalgonda Flagship, capturing guest details, reservation date, dining slot, party size, and table ambience with WhatsApp booking ticket.

### FR-03: Convention Hall Showcase & Booking Form
- **Section Placement:** Positioned immediately above the Footer (`id="conventions"`).
- **Interactive Form Modal:**
  - Input validation: Name, valid Indian phone number, date (future date only), guest count ($10 \le \text{guests} \le 100$).
  - Dynamic Catering selection (Pot Biryani Banquet, Royal Multi-Course, Custom Buffet).
  - Royal Add-on checkboxes (Mandap/Floral Decor, Audio-Visual Stage, Live Traditional Nadaswaram, Live Ragi Mudda Counters).

### FR-04: Backend Convention Booking Pipeline
- **Endpoint:** `POST /api/conventions`
- **Output Contract:**
  ```json
  {
    "success": true,
    "message": "Royal Convention booking inquiry received.",
    "booking": {
      "bookingNumber": "CNV-4821",
      "organizerName": "...",
      "eventType": "...",
      "hallPreference": "Grand Palegar Convention Hall",
      "expectedGuests": 100,
      "eventDate": "2026-10-15",
      "status": "REQUEST_RECEIVED",
      "whatsappUrl": "https://wa.me/..."
    }
  }
  ```

## 4. Non-Functional Requirements
- **Design System:** Seamless adherence to the Palegar royal aesthetic (deep obsidian `#0D0705`, royal gold `#E5A93C`, spice crimson `#D6301D`, Cinzel typography, glassmorphism, zero emojis in menus).
- **Performance:** $2.0\times$ DPR cap on canvas scrubber; WebP frame sequencing; zero full-page reloads.
- **Responsiveness:** Flawless layout on desktop, tablet, and mobile displays with pinned-header dialog containment.
