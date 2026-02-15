# Elevation Axis - Marketing Website

## Overview

Elevation Axis is a marketing website for a growth systems consultancy that helps local service businesses stop leaking leads and turn marketing spend into booked jobs. The site is a multi-page, minimalist editorial-style marketing website featuring a home page, services page, about page, contact form, and resources page. The brand targets local service businesses (HVAC, plumbers, contractors, dentists, consultants, etc.) and offers a four-phase engagement model: Prepare (diagnostic), Rescue (site rebuild), Guard (system integration), and Protect (ongoing maintenance).

The founder is Brittany, and the brand name is "Elevation Axis" (evolved from an earlier "Elevation Systems" concept). The core messaging is "fix the bucket first" — seal the leaks before spending more on marketing. The design aesthetic is luxury editorial — black text on warm off-white (#F6F2EA), serif headings (Playfair Display), clean sans-serif body text (Inter), lots of whitespace, and minimal animations. The vibe is calm authority, grounded, strategic, and feminine but not cute. Important: avoid AI-heavy language — focus on modern technology, structure, and infrastructure instead.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React (non-SSR SPA) with TypeScript
- **Routing**: Wouter (lightweight client-side router, not React Router)
- **Styling**: Tailwind CSS v4 with `@tailwindcss/vite` plugin, using CSS variables for theming
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives — components live in `client/src/components/ui/`
- **State Management**: TanStack React Query for server state; local React state for UI
- **Forms**: React Hook Form with Zod validation via `@hookform/resolvers`
- **Build Tool**: Vite with React plugin
- **Typography**: Google Fonts — Playfair Display (serif headings) + Inter (sans body)
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript, executed via `tsx` in development
- **API Structure**: RESTful JSON API under `/api/` prefix. Currently has one endpoint: `POST /api/contact` for contact form submissions
- **Build**: esbuild bundles server code to `dist/index.cjs` for production; Vite builds client to `dist/public/`
- **Dev Mode**: Vite dev server runs as middleware inside Express (see `server/vite.ts`), with HMR over WebSocket at `/vite-hmr`
- **Production**: Static files served from `dist/public/` with SPA fallback to `index.html`

### Database
- **Database**: PostgreSQL (required — `DATABASE_URL` environment variable must be set)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema Location**: `shared/schema.ts` — shared between client and server
- **Tables**:
  - `users` — id (UUID, auto-generated), username (unique), password
  - `contact_submissions` — id (serial), name, email, business_name, message, created_at (auto timestamp)
- **Migrations**: Drizzle Kit with `drizzle-kit push` command (`npm run db:push`)
- **Connection**: `pg.Pool` via `node-postgres`, configured in `server/db.ts`
- **Session Store**: `connect-pg-simple` is listed as a dependency (PostgreSQL-backed sessions), though session middleware isn't fully wired in current routes

### Storage Layer
- **Pattern**: Repository/storage pattern in `server/storage.ts` — `IStorage` interface with `DatabaseStorage` implementation
- **Exported singleton**: `storage` instance used by route handlers

### Project Structure
```
client/               # Frontend SPA
  src/
    components/       # React components
      ui/             # shadcn/ui component library
      layout.tsx      # Main layout with nav, footer
    pages/            # Route pages (home, services, about, contact, resources)
    hooks/            # Custom React hooks
    lib/              # Utilities (queryClient, cn helper)
    index.css         # Tailwind + theme CSS variables
    main.tsx          # App entry point
    App.tsx           # Router setup
  index.html          # HTML template
server/               # Express backend
  index.ts            # Server entry, middleware setup
  routes.ts           # API route registration
  storage.ts          # Database access layer
  db.ts               # Drizzle/pg connection
  vite.ts             # Vite dev middleware
  static.ts           # Production static file serving
shared/               # Shared between client & server
  schema.ts           # Drizzle schema + Zod validators
attached_assets/      # Brand assets, images, reference docs
migrations/           # Drizzle migration output
script/
  build.ts            # Production build script (Vite + esbuild)
```

### Key Scripts
- `npm run dev` — Start development server (Express + Vite HMR) on port 5000
- `npm run build` — Build client (Vite) and server (esbuild) to `dist/`
- `npm start` — Run production server from `dist/index.cjs`
- `npm run db:push` — Push Drizzle schema to PostgreSQL
- `npm run check` — TypeScript type checking

## External Dependencies

- **PostgreSQL** — Primary database, connected via `DATABASE_URL` environment variable. Required for the app to start.
- **Google Fonts CDN** — Playfair Display and Inter fonts loaded from `fonts.googleapis.com`
- **Radix UI** — Headless UI primitives powering all shadcn/ui components
- **TanStack React Query** — Client-side data fetching and caching
- **Drizzle ORM + Drizzle Kit** — Database ORM and migration tooling for PostgreSQL
- **Zod** — Schema validation used on both client (form validation) and server (API input validation)
- **Replit Plugins** (dev only) — `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` for Replit-specific development features