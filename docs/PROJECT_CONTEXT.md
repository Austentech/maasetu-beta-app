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

**Phase 1 — Foundation & public website.** Complete.

## Implemented

- pnpm/bun workspace monorepo (see `docs/ARCHITECTURE.md`).
- Complete public website homepage (`/`): hero with original illustration,
  About, Our approach, How it works, For patients, For doctors, Trust &
  privacy, FAQ, Contact, footer — all original, honest copy.
- Responsive navigation: desktop top bar; app-style bottom navigation on
  phone/tablet; patient and doctor entry points always reachable.
- Honest login entry points and legal placeholders as accessible in-page
  dialogs (single public route by sandbox constraint).
- SEO: metadata, canonical URL, Open Graph (generated `og.png`), sitemap,
  robots, Organization JSON-LD — no invented facts.
- Accessibility: semantic landmarks, skip link, keyboard focus states,
  aria labelling, WCAG AA-verified token contrast (21/21 checks).
- Framer Motion used selectively (hero entrance, gentle section reveals,
  heart pulse) with `prefers-reduced-motion` respected in every animated
  component.
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
- Final Privacy Policy and Terms of Service texts (placeholders clearly
  state they are in preparation).
- Email sending, analytics, rate limiting (planned; see SECURITY.md).
- Deployment pipeline and real DNS/TLS for maasetu.in.

## Important decisions

1. **Honesty over theatre.** Nothing on the website claims services that do
   not exist. Login buttons open dialogs that say the portals are coming;
   service areas are labelled as being built; legal links open non-deceptive
   placeholders; there is no fake data, fake testimonials, invented
   statistics or made-up launch dates.
2. **Single public route.** The current hosting sandbox exposes only `/`.
   Login/legal content therefore lives in dialogs rather than routes. When
   the site is deployed to real hosting, these can become dedicated pages
   with redirects — content is already written.
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

- The website runs in dev mode inside the sandbox; production build was
  verified in an isolated copy of the repo (see IMPLEMENTATION_LOG.md).
- The API is not wired to the website yet (the homepage is fully static —
  by intent; there is no data to fetch).
- The OG image and favicons are generated assets; regenerate them with the
  scripts in `scripts/` if brand inputs change.
- Legal texts are placeholders and must be finalised before accounts open.
