# MaaSetu — Project Context

Single source of truth for **what MaaSetu is, where the project stands, and
what is intentionally not built yet**. Update this document at every phase
boundary.

## Product purpose

MaaSetu ("Maa" — mother, "Setu" — bridge) is a maternal healthcare platform
for India. Its purpose is to make pregnancy care **coordinated**: connecting
expectant mothers with doctors, follow-ups, diagnostic laboratories and
organised, relevant information — so that no mother has to assemble her own
care logistics out of paper notes, phone calls and search results.

The product will eventually serve:

- **Patients** — expectant mothers and their families
- **Doctors and doctor staff** — clinics and practices caring for them
- **Diagnostic laboratories** — whose reports shape pregnancy decisions
- **Platform operations** — department sub-admins and super admins

## Brand identity

| Element | Value |
| --- | --- |
| Name | MaaSetu |
| Tagline | Because Every Mother Matters |
| Website | https://www.maasetu.in |
| Email | maasetu.app@gmail.com |
| Instagram | @joinmaasetu |
| Primary colour | `#FD1843` (signature pink) |
| Secondary colour | `#741A2F` (deep burgundy) |
| Accent colour | `#FFC6A8` (warm peach) |
| Background colour | `#FFF9FA` (near-white canvas) |

Brand personality: trustworthy, human, compassionate, medically credible,
premium, calm, modern, accessible.

**Logo assets.** The owner supplied two source files (stored under
`assets/brand/`, the authoritative reference):

1. Pictorial mark — mother profile with baby and stethoscope emblem.
2. Wordmark — "MaaSetu" ("Maa" in pink, "Setu" in burgundy).

`scripts/process_brand_assets.py` converts these into the web-ready assets
used by the site (transparent mark, transparent wordmark, favicon, Apple
touch icon). The artwork is never redrawn or replaced — only cropped and
made background-transparent.

**Design token decisions.** The exact brand pink `#FD1843` measures 3.75:1
against the canvas — suitable for large display text and accents but **not**
for small text or white-on-pink button labels. The token system therefore
introduces `brand-500 = #DC0E36`, an interactive shade of the same pink that
meets WCAG AA (5.05:1) for white text, used for buttons and small accents.
This is a deliberate, documented accessibility decision — not a brand
change.

## Current phase

**Phase 1 — Foundation & public website.** Complete, refined
(2026-10-11: illustrations, hero messaging, loading/perf fixes, footer
credit; 2026-10-13: Services illustrations + working branded preloader)
and **ready for the backend phase** — the frontend has no
environment variables, no API client and no mock coupling; the backend
prerequisites and recommended order are listed at the end of
IMPLEMENTATION_LOG.md §8.

## Implemented

- pnpm/bun workspace monorepo (see `docs/ARCHITECTURE.md`).
- **Multi-page public website** — 8 routes, all server-rendered and fully
  static: `/` (home), `/about`, `/services`, `/patients`, `/doctors`,
  `/contact`, `/privacy`, `/terms`, plus a branded 404 page. Each page has
  its own metadata, canonical URL and Open Graph image; the sitemap lists
  all public routes.
- **Hero visual:** a warm prenatal-consultation illustration (expectant
  mother + doctor) generated for MaaSetu with the project's
  image-generation tooling, VLM-verified for anatomy/credibility, stored
  locally at `apps/web/public/images/hero-consultation.png`, and served
  via `next/image` with `priority` and a generated blur placeholder. The
  hero supporting line is the owner-specified Hinglish headline
  **"Bharat se, Bharat ki Maaon ke liye"**, and the headline carries a
  designed ECG pulse mark (inline SVG, CSS-only draw-once animation,
  reduced-motion safe) in place of the earlier red word treatment.
- **About mission illustration:** a pregnant Indian mother and her
  gynecologist reviewing one pregnancy timeline together — generated for
  MaaSetu with the project's image-generation tooling (VLM defect-scan
  clean), presented in the brand's arch motif with LQIP blur-up,
  lazy-loaded. Provenance documented in IMPLEMENTATION_LOG.md.
- **Service-spot illustrations:** three hand-drawn SVG diagrams (service
  areas 01/03/04) sharing the care-journey visual DNA — dotted setu lines,
  the heartbeat, the brand palette. Static server-rendered SVG, zero
  client JavaScript. Service area 02 (doctor consultations & follow-up)
  instead carries a full editorial illustration — see below.
- **Services-page illustrations (2026-10-13):** the route opener shows an
  expectant Indian mother in a calm pregnancy-care context
  (`apps/web/public/images/services-expectant-mother.png`, the route's
  above-the-fold LCP: `priority` + preload + LQIP), and service area 02
  carries a distinct in-person consultation scene — a gynecologist
  listening attentively across a desk from the seated expectant mother
  (`apps/web/public/images/services-doctor-consultation.png`, lazy +
  LQIP). Both generated for MaaSetu with the project's image-generation
  tooling, style-matched to the homepage/About illustrations, VLM-reviewed
  with clean anatomy and zero text artifacts; provenance in
  IMPLEMENTATION_LOG.md.
- Responsive navigation across all routes: desktop top bar with active
  states; app-style bottom navigation on phone/tablet (route-based,
  respects safe areas); patient and doctor entry points always reachable.
- Honest login entry points (dialogs that say the portals are not live
  yet — no fake sign-in) and real `/privacy` + `/terms` pages with
  stage-accurate content (no invented certifications or legal review).
- Contact page with real channels only (email + Instagram) — no form,
  because no backend endpoint exists for one; the page says so plainly.
- SEO: per-page metadata, canonical URLs, Open Graph (generated `og.png`),
  sitemap, robots, Organization JSON-LD — no invented facts.
- Accessibility: semantic landmarks, skip link, keyboard focus states,
  aria labelling, WCAG AA-verified token contrast (21/21 checks).
- Framer Motion used selectively (gentle section reveals, dialog/accordion
  motion) with `prefers-reduced-motion` respected in every animated
  component. **Above-the-fold hero copy is plain server-rendered HTML**
  (no hydration-gated entrance); the hero image has **no** entrance
  animation — the blur-up placeholder is the loading experience
  (documented in ARCHITECTURE.md).
- **Branded initial-load transition (2026-10-13):** a MaaSetu preloader
  (emblem + wordmark on `#FFF9FA`) is server-rendered into every full
  document load and dismisses itself the moment React hydrates — no
  timers, no network waits, never on client-side navigation, with a
  pure-CSS failsafe cap (~2.6 s) so a failed script bundle can never
  leave it stuck. Reduced-motion disables all of its animations. The
  earlier "no preloader" decision was superseded by the owner's explicit
  request; see ARCHITECTURE.md for the full behaviour contract.
- **Shared footer maker credit** on every public page: "Crafted with code
  and curiosity by Sankhya Stack 💡 Made in — पाटलिपुत्र" — implemented
  once in the shared footer component, with self-hosted Noto Sans
  Devanagari (next/font, devanagari subset, lazy) so the Devanagari text
  renders correctly on every client.
- NestJS REST API foundation: `/api/v1/health`, validated environment,
  request validation pipe, response/error envelope, security headers,
  CORS allowlist, URI versioning, Jest unit + e2e tests.
- Shared API contract types package (`@maasetu/shared`, type-only).
- Documentation set (this file plus ARCHITECTURE, DEVELOPMENT_GUIDE,
  SECURITY, IMPLEMENTATION_LOG).

## Not implemented (by design — deferred to future phases)

- Any authentication (no Supabase connection, no login forms, no sessions).
- Any database schema, migrations or RLS policies (no Supabase project
  configuration has been supplied yet).
- Patient portal, doctor portal, doctor staff roles, laboratory panel,
  sub-admin panels, super admin panel.
- Any clinical workflow: appointments, bookings, reports, messaging.
- Final Privacy Policy and Terms of Service (the current pages describe
  the honest position for the website stage; full policies arrive before
  any data is collected or accounts open).
- Email sending, analytics, rate limiting (planned; see SECURITY.md).
- Deployment pipeline and real DNS/TLS for maasetu.in.

## Important decisions

1. **Honesty over theatre.** Nothing on the website claims services that do
   not exist. Login buttons open dialogs that say the portals are coming;
   service areas are labelled as being built; legal links open non-deceptive
   placeholders; there is no fake data, fake testimonials, invented
   statistics or made-up launch dates.
2. **Multi-page from the start of the revision.** The original Phase 1
   build assumed the sandbox gateway exposed only `/` and used dialogs for
   legal content. Re-testing showed the gateway proxies **all paths**, so
   the site was converted to real routes (`/about`, `/services`, …) —
   verified 200 through the gateway for every route. Login entry points
   remain honest dialogs until the portals exist, because no
   authentication is implemented and the destination subdomains are not
   live.
3. **No Prisma / no local database.** The documented data architecture is
   Supabase-managed PostgreSQL. Phase 1 has no schema, so no ORM is wired
   up; the scaffold's Prisma/SQLite setup was removed rather than left as
   dead, misleading configuration.
4. **TypeScript strictness is enforced**, not just declared:
   `ignoreBuildErrors` was removed from the Next config, `noImplicitAny`,
   `noUnusedLocals` and `noUnusedParameters` are on, and typecheck is part
   of the verified exit criteria.
5. **Dual package-manager support.** Developers use pnpm
   (`pnpm-workspace.yaml`); this sandbox auto-runs `bun run dev` at the repo
   root, so `package.json` also declares `workspaces`. Same globs, one lock
   file (`bun.lock`). Documented in DEVELOPMENT_GUIDE.md.

## Current limitations

- The website runs in dev mode inside the sandbox; the production build
  was verified in an isolated mirror of the repo (sources +
  `bun install --frozen-lockfile`), including measured Web Vitals — see
  IMPLEMENTATION_LOG.md. **Note:** the sandbox dev server compiles routes
  on first visit (~3.5 s for the home route cold) — this is dev-server
  behaviour, not product slowness; the production build is fully static.
- Web Vitals were measured on localhost without network throttling;
  absolute numbers will differ on real Indian mobile networks, but CLS 0
  and a single optimised LCP image hold by construction.
- The API is not wired to the website yet (all pages are fully static —
  by intent; there is no data to fetch).
- The hero/About illustrations, OG image and favicons are generated
  assets; regenerate them with the scripts in `scripts/` if inputs change.
- Legal pages describe the current position; full policies must be
  finalised before accounts open.
