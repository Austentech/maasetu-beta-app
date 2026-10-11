# MaaSetu — Architecture

## Overview

MaaSetu is a monorepo with two applications and one shared package:

```
maasetu/
├── apps/
│   ├── web/       Next.js 16 — public website & future patient/doctor frontends
│   └── api/       NestJS 12 — server-side business logic & REST endpoints
├── packages/
│   └── shared/    API contract types (single source of truth for shapes)
├── assets/brand/  Owner-supplied logo sources (authoritative)
└── scripts/       Tooling (asset pipeline, contrast checks, OG generation)
```

**Workspace tooling.** `pnpm-workspace.yaml` defines the pnpm workspace for
developers. The current hosting sandbox auto-runs `bun run dev` at the repo
root, so `package.json` also declares `"workspaces": ["apps/*",
"packages/*"]` (same globs, bun/npm semantics). Both managers resolve the
same layout; `bun.lock` is the committed lockfile from this environment.

### Responsibility boundaries

| Owner | Responsibility |
| --- | --- |
| `apps/web` (Next.js) | Website UI, routing, SEO, public content, future portal frontends. Server Components by default; client components only for interactivity (navigation state, dialogs, animation wrappers). |
| `apps/api` (NestJS) | All privileged server-side logic: request validation, authorization, orchestration of data access, integrations. Business logic must not be duplicated in the frontend. |
| Supabase Auth (future) | Identity and credentials. Issues JWT access tokens; never stores passwords in application tables. |
| Supabase-managed PostgreSQL (future) | Structured application data, protected by Row Level Security. |
| `packages/shared` | Type-only API contract (response/error envelope, endpoint payload shapes). No runtime code by design — Phase 1 contains no logic worth sharing. |

**Data architecture decision.** There is exactly one planned relational
database: the Supabase-managed PostgreSQL project supplied by the owner. No
second database is created. Phase 1 connects to nothing — the scaffold's
local Prisma/SQLite setup was removed to keep this architecture
unambiguous. Schema changes will be version-controlled through migrations
once the Supabase project configuration is provided. The root `db:push`
script is intentionally a no-op.

## apps/web — structure and conventions

```
apps/web/src/
├── app/                  # App Router routes:
│   ├── page.tsx          #   /        — home (editorial overview)
│   ├── about/            #   /about   — mission, values, honest status
│   ├── services/         #   /services — intended service areas + journey diagram
│   ├── patients/         #   /patients — patient overview
│   ├── doctors/          #   /doctors — doctor overview
│   ├── contact/          #   /contact — real channels only (no form)
│   ├── privacy/          #   /privacy — stage-accurate privacy position
│   ├── terms/            #   /terms   — stage-accurate website terms
│   ├── not-found.tsx     #   branded 404
│   ├── layout.tsx        # root layout: header, footer, bottom nav, fonts,
│   │                     #   default metadata + Organization JSON-LD
│   ├── robots.ts / sitemap.ts  # (all public routes listed)
│   └── icon.png / apple-icon.png  # file-based metadata
├── components/
│   ├── brand/            # Logo lockup, hero-visual (mother SVG, About page),
│   │                     # care-journey diagram
│   ├── dialogs/          # Honest login notice dialogs
│   ├── layout/           # Header, main-nav-links (active states), mobile
│   │                     # bottom nav, footer, providers, legal-page shells
│   ├── sections/         # Homepage sections (hero, approach, how-it-works,
│   │                     # audience-entry, trust, faq, contact-cta)
│   └── ui/               # Button, Reveal, SectionHeading, PageHero,
│                         #   Breadcrumb (+ kept shadcn primitives)
├── config/site.ts        # Identity, contacts, nav, routes, subdomain map,
│                         #   shared ogImage definition
└── lib/utils.ts          # cn() helper
```

Conventions:

- **Server Components by default.** Only `providers.tsx`, `reveal.tsx`,
  `hero-visual.tsx`, `mobile-bottom-nav.tsx`, `main-nav-links.tsx` and the
  shadcn dialog/accordion primitives are client components — each requires
  interactivity. All eight pages are server-rendered and fully static.
- **Per-page metadata.** Each route exports its own `metadata` (title,
  description, canonical, Open Graph with the shared `ogImage` from
  `config/site.ts`); the root layout provides defaults and the title
  template. Page-level `openGraph` replaces the layout's, so pages
  re-include the image explicitly.
- **Design tokens** live in `src/app/globals.css` as Tailwind CSS 4
  `@theme` tokens (brand ramp, peach ramp, warm neutrals) plus shadcn
  semantic variables mapped onto the same palette. Buttons/links use
  `brand-500` (#DC0E36) for AA-compliant interactive pink; pure brand
  `#FD1843` is reserved for display-size accents. See
  `scripts/check_contrast.py`.
- **Animation policy.** Framer Motion, transform/opacity only, no
  layout-shifting animation, no autoplaying heavy animation. Every animated
  component checks `useReducedMotion()`, and `MotionConfig
  reducedMotion="user"` wraps the app.
- **Caching & rendering (documented behaviour).** All eight public routes
  are fully static (prerendered at build; verified in the production build
  output: 14 static routes including robots/sitemap/icons). Public content
  needs no revalidation strategy beyond normal builds. There is no private
  data in Phase 1; when portals exist, private responses will be
  `no-store` and never cached in shared caches.
- **Images.** Raster imagery lives in `public/images/` (content imagery)
  and `public/brand/` (logo lockups). The hero consultation illustration
  is a 1024×1024 PNG (88 KB source) served through `next/image` with
  `priority`, explicit `width`/`height`, a responsive `sizes` attribute and
  a generated LQIP blur placeholder (`placeholder="blur"`); the optimizer
  serves it as ~26 KB WebP at 640px width. Logos use `priority` in the
  header/footer. Inline SVGs (care-journey diagram, mother illustration)
  cost no network requests. `og.png` (1200×630) is generated by
  `scripts/og-image.html` via a headless-browser screenshot and features
  the consultation illustration.
- **Loading experience (deliberate decision).** There is **no blocking
  branded preloader and no route-level `loading.tsx`** — by design, not
  omission. Rationale: every route is static and server-rendered, so the
  first paint arrives immediately; a full-screen preloader or client-side
  loading gate would only delay content that is already ready (and
  `loading.tsx` would show skeletons for content that appears instantly).
  The genuine loading need — the above-the-fold hero image — is handled by
  the blur-up LQIP placeholder with zero layout shift, and the hero image
  is deliberately **not** wrapped in an entrance animation so nothing
  waits on JavaScript. Link prefetching (default `<Link>` behaviour)
  makes route transitions effectively instant on static routes.

## apps/api — structure and conventions

```
apps/api/src/
├── main.ts               # Bootstrap (create app → configureApp → listen)
├── bootstrap.ts          # Shared pipeline: helmet, CORS, versioning, pipes,
│                         # envelope interceptor, exception filter
├── app.module.ts         # ConfigModule (validated env) + feature modules
├── config/               # EnvModel (class-validator), EnvService (typed access)
├── common/
│   ├── interceptors/     # ResponseEnvelopeInterceptor
│   └── filters/          # AllExceptionsFilter
└── modules/health/       # GET /api/v1/health (+ unit & e2e tests)
```

### REST conventions

- **Base path & versioning:** URI versioning — every route lives under
  `/api/v1/...`. Breaking changes bump the version.
- **Response envelope (success):**
  ```json
  { "success": true, "data": { ... } }
  ```
- **Error envelope (failure):**
  ```json
  { "success": false, "error": { "code": "NOT_FOUND", "message": "..." } }
  ```
  Shapes are declared once in `@maasetu/shared`.
- **Validation:** a global `ValidationPipe` with `whitelist`,
  `forbidNonWhitelisted` and `transform` — unknown fields are rejected, not
  silently dropped. DTOs use `class-validator` decorators.
- **Errors:** `HttpException` messages are surfaced for 4xx (safe — e.g.
  validation details); 5xx and unknown errors are logged internally with
  stack traces and answered with a generic message. No internals leak.
- **Health endpoint** (`GET /api/v1/health`) deliberately exposes only
  `status`, `service`, `version`, `timestamp` — no database, dependency or
  infrastructure diagnostics.
- **Configuration:** environment is validated once at boot
  (`config/env.validation.ts`) with explicit development defaults; invalid
  configuration fails fast.
- **Tests:** unit tests for services; e2e tests boot the app through the
  same `configureApp` used in production, so tested behaviour == shipped
  behaviour.

### Sandbox gateway note

The sandbox exposes a single external port via a gateway (see `Caddyfile`).
Frontends reach other local services with relative paths plus the
`XTransformPort` query parameter, e.g. `fetch('/api/v1/health?XTransformPort=4000')`.
The gateway proxies **all paths** to the web app (verified: every public
route returns 200 through it), which is what enabled the multi-page
structure. Phase 1 pages are static and call nothing; the mechanism is
documented for future integration.

## Authentication & authorization plan (future phases — not implemented)

**Authentication flow (planned):**

1. Supabase Auth manages identities and issues JWT access/refresh tokens.
   Passwords live only in Supabase — never in application tables.
2. The browser obtains tokens via the Supabase client (anon key is
   public-by-design; the **service-role key never reaches the browser**).
3. `apps/api` validates every incoming access token server-side (JWT
   signature check against the Supabase project's JWKS/secret) via a Nest
   auth guard, before any controller logic runs.
4. The API derives the caller's role/tenant **from validated token claims
   and database lookups — never from values supplied by the browser.**

**Defense-in-depth model — how the layers cooperate:**

| Layer | Role | Notes |
| --- | --- | --- |
| Supabase Auth | Identity, credentials, JWT issuance | Single source of identity |
| NestJS guards/policies | Route- & resource-level authorization, tenant boundaries, staff-to-doctor relationships | Coarse + fine rules in one place, server-side only |
| PostgreSQL RLS | Row-level safety net behind the API | Guards against direct/accidental table access; documented policies per table |

Guiding rule to avoid conflicting logic: **the API enforces the full
authorization decision; RLS enforces the same boundaries at the row level as
a backstop.** Policies will be written to mirror — not contradict — the
documented permission model. Both are specified before any dashboard ships.

**Planned role model (least privilege):** patient, doctor, doctor-staff
(scoped to their doctor), lab-staff and lab-admin (scoped to their lab),
department sub-admins (finance/sales/marketing/accounts/HR — scoped by
department routes and permissions), super admin. Every privileged check
includes tenant/resource ownership assertions.

## Future subdomain strategy

Documented target architecture — **none of these panels exist yet**:

| Subdomain | Experience |
| --- | --- |
| `www.maasetu.in` / `maasetu.in` | Public website (this app) |
| `maa.maasetu.in` | Patient panel |
| `doctors.maasetu.in` | Doctor panel **and** doctor staff panel (staff operate within the doctors subdomain under assigned permissions) |
| `labs.maasetu.in` | Diagnostic laboratory panel |
| `sub-admin.maasetu.in` | Department sub-admin panels (finance, sales, marketing, accounts, HR…) sharing one subdomain with department-scoped routes and permissions |
| `sup-admin.maasetu.in` | Super admin panel |

Implementation options when the time comes (decision deferred — both work
with the current structure):

1. **One Next.js app, middleware-based subdomain routing** — best while
   panels share design system and tooling; deploy once, route by host.
2. **One app per panel as workspace packages** (`apps/portal-patient`, …) —
   strongest isolation when panels diverge.

Either way, `apps/web/src/config/site.ts` already centralises the subdomain
map so the strategy lives in one file, and all panels will call the same
`apps/api` (which authorizes per subdomain origin via the CORS allowlist).

## Why the web app is at `apps/web` (and other structural notes)

- The sandbox's dev supervisor runs `bun run dev` at the repo root; the root
  `dev` script delegates into `apps/web` on port 3000, keeping both the
  requested monorepo shape and the supervisor working.
- `db:push` at the root is a no-op message so the sandbox supervisor's
  startup sequence remains valid after Prisma removal.
- `packages/shared` exposes TypeScript types only (`types` points at source,
  no runtime entry) — accidental runtime imports fail loudly. A build step
  will be added only when runtime shared code genuinely exists.
