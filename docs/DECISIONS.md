# Architecture Decisions (docs/DECISIONS.md)

## ADR-001: Reroute Food Delivery to Swiggy & Zomato and Focus In-House Platform on Table Reservations & Convention Banquets

### Decision:
Reroute the online food ordering interaction on the website directly to Kritunga's official store listings on Swiggy and Zomato via an interactive partner selection modal (`OrderPartnerModal.tsx`), rather than maintaining an in-house payment and delivery fleet simulator. Concurrently, expand in-house hospitality by building a dedicated Royal Convention & Banquet Booking full-stack pipeline (`ConventionBookingSection.tsx`, `ConventionBookingModal.tsx`, `/api/conventions`) alongside Table Reservations.

### Reason:
Food delivery requires active driver dispatch, geofencing, live kitchen ticketing, and automated settlement, which Swiggy and Zomato handle at nationwide scale with millions of daily users. Conversely, Table Reservations and large-scale Convention & Banquet Bookings (50 to 1,000 guests for weddings, corporate galas, and family milestones) represent high-margin, bespoke royal hospitality experiences that Kritunga must directly own and manage.

### Rejected Alternatives:
1. Maintaining an in-house delivery checkout simulator (`BuyNow.tsx` mock card form) that created confusion without an actual delivery fleet.
2. Forcing table reservation and banquet inquiries through generic third-party portals instead of owning the customer relationship and WhatsApp concierge directly.

### Status:
Accepted
