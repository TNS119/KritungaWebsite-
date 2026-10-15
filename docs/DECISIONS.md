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

---

## ADR-002: Dual-Job CI/CD & Automated Heartbeat Cron for Zero-Cost Production Reliability

### Decision:
Implement a GitHub Actions workflow (`.github/workflows/ci-cd.yml`) featuring:
1. Automated monorepo build validation (`validate-and-build`) running on every push and pull request to `main`. It guarantees that Prisma Client generation, Express TypeScript compilation, and Next.js static page production succeed before any code reaches production.
2. A scheduled 12-minute cron heartbeat (`keep-alive-heartbeat`) pinging the live backend `/api/health` endpoint when deployed on free-tier container PaaS (e.g., Render, Koyeb).

### Reason:
1. Monorepo builds often fail silently if Prisma schema types are not generated prior to Next.js or Express compilation in isolated CI runners.
2. Free-tier cloud container instances hibernate after 15 minutes of inbound HTTP inactivity, resulting in unacceptable 30–60 second cold-start delays when prospective diners or event organizers attempt to book tables or convention banquets. A 12-minute heartbeat pings the endpoint within the 15-minute hibernation window, maintaining hot container execution at zero cost.

### Rejected Alternatives:
1. Relying on paid third-party uptime monitoring tools (e.g. Pingdom, UptimeRobot) with subscription costs or strict ping limits.
2. Forcing manual verification on developer machines without automated branch protection in GitHub.

### Status:
Accepted

---

## ADR-003: AWS Free Tier vs Production Hosting Strategy

### Decision:
Support dual-path production hosting:
1. **AWS 12-Month Free Tier Pathway:** Deployable on a single `t2.micro` or `t3.micro` EC2 instance using Docker Compose and Nginx, with a mandatory 2 GB–4 GB Linux swapfile to prevent Next.js `next build` OOM errors, combined with EBS volume mounting for SQLite database persistence.
2. **Managed Modern Serverless Pathway:** Decoupled deployment utilizing **Vercel** for Next.js frontend (global Edge CDN, automated zero-config builds, free tier) and **Render / Railway / Fly.io** for the Express backend + persistent volume (or Supabase free-tier PostgreSQL), keeping the operational cost at $0 without 12-month expiration.

### Reason:
AWS offers 750 hours/month of EC2 compute under the Free Tier for the first 12 months, but requires careful memory management (`t2.micro` has only 1 GB RAM, causing Next.js builds to crash without a swapfile). Modern serverless platforms (Vercel + Render/Supabase) offer permanent free tiers with built-in CDN and zero sysadmin overhead. Providing explicit blueprints for both architectures allows full deployment flexibility.

### Rejected Alternatives:
1. Multi-container AWS ECS Fargate + RDS setup for initial launch (costs ~$60–$90/month, unsuitable for zero-cost requirements).
2. Deploying without swapfile on `t2.micro` (guarantees build failure).

### Status:
Accepted

---

## ADR-004: Standardized Reference Templates & Theme-Aligned Dropdown UI

### Decision:
1. Standardize all user-facing sample inputs, emails, names, organization titles, and branch addresses into bracketed reference templates (`e.g. [Guest Name]`, `e.g. [Organizer Full Name]`, `e.g. [name@domain.com]`, `e.g. [Company / Family Trust]`, `[Chandanapalli / Landmark], Hyderabad Road, Nalgonda, Telangana - 508001`, `e.g. [Stage Layout / Floral Requirements / Dietary Notes]`).
2. Replace default unstyled browser `<select>` controls with a custom dark/light theme-aware `CustomDropdown` across all reservation and booking dialogs.

### Reason:
Hardcoded individual names and addresses led users to confuse placeholder guidelines with real customer data. Standardized bracketed syntax clarifies input intent without interfering with HTML form validation. Custom dropdowns harmonize with the Palegar royal design system (gold borders, dark obsidian backgrounds, gold chevron indicators, fluid transitions) and eliminate OS-native white dropdown popovers.

### Rejected Alternatives:
1. Relying on browser-default `<select>` which looks starkly out of theme on Windows and macOS.
2. Leaving arbitrary sample names that could be misconstrued as real bookings.

### Status:
Accepted

