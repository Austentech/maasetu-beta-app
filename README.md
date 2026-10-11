# MaaSetu

**Because Every Mother Matters.**

MaaSetu is a maternal healthcare platform for India, built to connect
expectant mothers with trusted doctors, organised diagnostics and reliable
pregnancy guidance — one coordinated journey.

This repository holds the **Phase 1 foundation**: a pnpm/bun workspace
monorepo containing the Next.js public website, a NestJS REST API
foundation, and a shared API-contract package.

> **Status — honest, as always:** the platform itself (patient portal,
> doctor portal, lab coordination) is **not implemented yet**. What exists
> today is the production-oriented foundation, a complete **multi-page
> public website** (home, about, services, patients, doctors, contact,
> privacy, terms), and a verified, tested API health service. See
> [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) for exactly what is
> implemented and what is not.

## Repository layout

```
maasetu/
├── apps/
│   ├── web/            # Public website — Next.js 16 (App Router, TypeScript, Tailwind CSS 4)
│   └── api/            # REST API — NestJS 12 (TypeScript, /api/v1, validation, envelope)
├── packages/
│   └── shared/         # Shared API contract types (type-only by design)
├── assets/brand/       # Owner-supplied logo source files (authoritative)
├── scripts/            # Tooling: brand/hero/about asset pipelines, WCAG contrast
│                       # checks, OG image, production build + vitals measurement
├── docs/               # Project documentation (see below)
├── .env.example        # Every environment variable the owner may need to supply
├── pnpm-workspace.yaml # pnpm workspace (developers)
└── package.json        # bun/npm workspace + orchestration scripts
```

## Public website routes

| Route | Purpose |
| --- | --- |
| `/` | Home — hero (consultation illustration, Hinglish headline "Bharat se, Bharat ki Maaon ke liye"), approach, how it works, audience entry points, trust, FAQ |
| `/about` | Mission story with mother-and-gynecologist illustration, values, honest current status |
| `/services` | The four intended service areas, each with a hand-drawn spot diagram + care-journey diagram |
| `/patients` | Patient-focused overview and honest status of patient access |
| `/doctors` | Doctor-focused overview and the questions shaping the platform |
| `/contact` | Real channels only (email + Instagram) — no form, by design |
| `/privacy` | Privacy position for the current stage (no data collected) |
| `/terms` | Terms for the website as it stands today |

All pages are server-rendered and fully static; every page carries its own
metadata, canonical URL and Open Graph image. The shared footer carries the
Sankhya Stack maker credit on every public page.

## Technology stack

| Concern | Choice |
| --- | --- |
| Frontend | Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS 4 |
| Animation | Framer Motion — transforms/opacity only, reduced-motion respected |
| Icons | Lucide + custom inline SVG illustration |
| Backend | NestJS 12, TypeScript (strict), REST with URI versioning (`/api/v1`) |
| Validation | DTO validation (`class-validator` / `class-transformer`) + validated environment |
| Auth (future) | Supabase Auth — **not implemented in Phase 1**; architecture documented |
| Database (future) | Supabase-managed PostgreSQL — **not connected in Phase 1**; no local DB |
| Package manager | pnpm (local development) / bun (this sandbox) — see note below |

## Quick start

Prerequisites: **Node.js ≥ 24.9** and **pnpm ≥ 9** (or bun ≥ 1.3).

```bash
# 1. Install dependencies (repo root)
pnpm install            # or: bun install

# 2. Environment — Phase 1 needs only the API defaults; nothing is required
#    for the website. Copy the template when you start adding real config:
cp .env.example apps/api/.env   # optional — defaults are development-safe

# 3. Run the public website (http://localhost:3000)
cd apps/web && pnpm dev

# 4. Run the API (http://localhost:4000) — in another terminal
cd apps/api && pnpm start:dev

# 5. Verify the API
curl http://localhost:4000/api/v1/health
```

## Commands

From the repository root (`pnpm run <script>` or `bun run <script>`):

| Script | What it does |
| --- | --- |
| `dev` | Start the Next.js website on port 3000 |
| `dev:api` | Start the NestJS API in watch mode |
| `build` | Production builds of web + api |
| `lint` | ESLint for web + api |
| `typecheck` | `tsc --noEmit` for web + api (strict) |
| `test` | API unit tests + e2e tests (Jest) |
| `db:push` | No-op in Phase 1 (data layer is Supabase PostgreSQL — see ARCHITECTURE) |

## Verified results (Phase 1 exit + website revisions)

Executed in this workspace — details and exact outputs in
[`docs/IMPLEMENTATION_LOG.md`](docs/IMPLEMENTATION_LOG.md):

- `tsc --noEmit` — **pass** (web + api, strict mode)
- `eslint` — **pass** (web + api)
- Jest — **7/7 tests pass** (4 unit + 3 e2e, including envelope + headers)
- `next build` — **pass** (all 8 public routes + 404 prerendered static;
  verified in an isolated repo mirror)
- Production server check — all routes 200, static assets/fonts/images 200,
  full security headers (CSP/HSTS/etc.) on the standalone build
- Link integrity — all 8 pages, all internal anchors resolve (no broken
  links; `scripts/check_links.py`)
- Measured Web Vitals on the production build (localhost, no throttling,
  fresh browser contexts — 2026-10-11 revision): home **FCP 476 ms /
  LCP 400 ms / CLS 0** (desktop), **FCP 332 ms / LCP 404 ms / CLS 0**
  (mobile 390 px); services LCP 348 ms; about LCP 1.28 s (lazy-loaded
  mission illustration, in-view on desktop first viewport); patients
  LCP 252 ms; **CLS 0 on every route**. Home ships ~210 KB compressed JS,
  133 KB fonts, ~103 KB images.
- Browser verification — desktop / tablet / mobile across all pages,
  navigation active states, dialogs, accordion, bottom navigation —
  **pass**, zero console errors, zero page errors
- WCAG AA — **21/21 token contrast checks pass** (`scripts/check_contrast.py`),
  footer maker credit 5.89:1 on white

## Documentation

| Document | Contents |
| --- | --- |
| [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) | Product purpose, brand, current phase, implemented vs. deferred |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Monorepo, responsibilities, auth plan, subdomain strategy, API conventions |
| [`docs/DEVELOPMENT_GUIDE.md`](docs/DEVELOPMENT_GUIDE.md) | Setup, commands, tooling notes, troubleshooting |
| [`docs/SECURITY.md`](docs/SECURITY.md) | Secrets, headers/CSP, authorization plan, outstanding work |
| [`docs/IMPLEMENTATION_LOG.md`](docs/IMPLEMENTATION_LOG.md) | What was done, test results, known issues, next step |

## Contact

- Email: [maasetu.app@gmail.com](mailto:maasetu.app@gmail.com)
- Instagram: [@joinmaasetu](https://www.instagram.com/joinmaasetu)
- Website: <https://www.maasetu.in>

---

© MaaSetu. Because Every Mother Matters.
