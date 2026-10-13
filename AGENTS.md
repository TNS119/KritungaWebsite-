# AGENTS.md

## Project Overview
Kritunga The Palegar's Cuisine is a high-performance, royal Rayalaseema culinary web application featuring an interactive canvas scroll experience, Swiggy & Zomato partner delivery redirection, table reservations, and an enterprise convention & banquet booking pipeline.

## Fast-Path Context Navigation
- **Stage 1 (Zero-Scan Routing):** Always read `CONTEXT.md` first to locate the exact target file, its line ranges, and contracts. Never run full-repository tree listings or multi-file exploratory reads when symbols are indexed.
- **Stage 2 (Deep Surgical Inspection):** Once the target file and line range are identified, read that specific target file in depth before modifying it. Never make superficial ("feather") guesses without inspecting the code to be edited.
- **Modular Lifecycle Documentation:** Check on-demand specs and records in `docs/` (`docs/SPEC.md`, `docs/DESIGN.md`, `docs/DECISIONS.md`, `docs/MEMORY.md`, `docs/DEPLOYMENT.md`).
- **Precise Modifications:** Perform surgical edits on the target file using `replace_file_content` and verify with targeted tests.

## Tech Stack
- **Monorepo:** npm workspaces (`frontend`, `backend`) with `concurrently`
- **Frontend:** Next.js 14 (App Router), React 18, TypeScript 5.7, Tailwind CSS 3.4, Lucide React, Framer Motion, Canvas Confetti
- **Backend:** Node.js, Express 4.21, TypeScript 5.7, tsx watch
- **Database & ORM:** SQLite with Prisma ORM 6.19
- **Messaging Integration:** WhatsApp Cloud API & Click-to-Chat deep links

## Essential Commands

### Build & Run
```bash
# Start both Frontend & Backend concurrently
npm run dev

# Start Frontend dev server (http://localhost:3000)
npm run dev:frontend

# Start Backend dev server (http://localhost:5000)
npm run dev:backend

# Build monorepo for production
npm run build

# Build Backend only
npm run build:backend

# Build Frontend only
npm run build:frontend

# Start production services locally
npm run start:backend
npm run start:frontend

# Start via Docker Compose (production)
docker compose up -d --build
```

### Database Operations (Prisma)
```bash
# Push schema updates to SQLite database
npm run db:push --workspace=backend

# Seed database with royal outlets and menu items
npm run db:seed --workspace=backend
```

### Lint & Quality Checks
```bash
# Lint frontend
npm run lint --workspace=frontend

# TypeScript type check (Backend)
npm run build:backend
```

## Code Style & Standards

```typescript
// ✅ Good - Explicit types, structured response contracts, descriptive naming
export async function createConventionBooking(
  payload: ConventionPayload
): Promise<{ success: boolean; message: string; booking?: ConventionResponseData }> {
  if (!payload.organizerName || !payload.organizerPhone) {
    throw new Error('Organizer name and phone are mandatory for convention booking');
  }
  const res = await fetch('/api/conventions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return await res.json();
}

// ❌ Bad - Implicit any, loose error handling, hardcoded unformatted endpoints
export async function bookConv(data: any) {
  try {
    return await fetch('http://localhost:5000/api/conventions', { method: 'POST', body: data });
  } catch (e) {}
}
```

## Boundaries & Permissions

- ✅ **Always:** Read `CONTEXT.md` first, run linter and relevant typechecks before completing tasks, keep `CONTEXT.md` and relevant `docs/` files updated at optimal turns, notify the user of markdown updates via callout note.
- ⚠️ **Ask First:** Database schema destruction or breaking migrations, altering external payment/messaging credentials, removing established business domain models.
- 🚫 **Never:** Run mutating git commands (`git add`, `git commit`, `git push`, `git checkout`, etc.) without explicit permission, commit `.env` or credentials, modify generated output directories (`dist/`, `.next/`, `out/`), hijack user browser tabs.

## Continuous Maintenance Protocol
- **Optimal Cadence:** Sync markdown files on structural changes, new ADRs, resolved bugs, or task completion. Avoid syncing on trivial conversational turns.
- **Notify User on Sync:** Include a brief notification callout in your response whenever documentation files are created or modified.
- **Recommend `/learn`:** Remind the user to run `/learn` after major architectural refactors or workflow discoveries.
