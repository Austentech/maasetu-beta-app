# MaaSetu — Implementation Log

Append-only. Records what was actually done, executed commands and their
real results, known issues, and the recommended next step.

---

## Phase 1 — Foundation & Public Website (2026-10-09)

### Step 1 — Environment inspection

- Loaded the sandbox fullstack environment (Next.js 16.1.3 scaffold with
  Tailwind CSS 4 + shadcn/ui, bun-managed dev supervisor on port 3000).
- Confirmed toolchain: bun 1.3.14, Node.js v24.21.0, pnpm not installed in
  sandbox (workspace config provided for pnpm users).
- Analysed both uploaded brand assets with a vision model:
  - `2.png` → pictorial mark (mother + baby + stethoscope emblem)
  - `file_000000005e2c7208b983058c30cd0119.png` → "MaaSetu" wordmark
- Decisions: pnpm/bun dual workspace monorepo; NestJS under Node; single
  public route (sandbox constraint) with honest dialogs; Prisma/SQLite
  removed (Supabase-managed PostgreSQL is the documented data layer).

### Step 2 — Monorepo & API foundation

**Files created/modified (selection — full tree in ARCHITECTURE.md):**

- Root: `package.json` (workspaces + orchestration scripts),
  `pnpm-workspace.yaml`, `.gitignore`, `.env.example`, `README.md`
- `apps/web/` — scaffold moved here; pruned to the components actually used
  (button, dialog, accordion + their radix deps); ~50 unused dependencies
  and ~57 unused shadcn components removed; `src/app/api/route.ts`,
  `src/lib/db.ts`, `src/hooks/*`, `tailwind.config.ts` (v3-style legacy)
  deleted
- `apps/api/` — new NestJS application:
  `main.ts`, `bootstrap.ts` (shared pipeline), `app.module.ts`,
  `config/env.validation.ts`, `config/env.service.ts`,
  `common/interceptors/response-envelope.interceptor.ts`,
  `common/filters/all-exceptions.filter.ts`,
  `modules/health/*` (+ spec), `test/health.e2e-spec.ts`, `nest-cli.json`,
  `tsconfig.json`, `eslint.config.mjs`
- `packages/shared/` — type-only API contract (`src/index.ts`, README)
- `scripts/process_brand_assets.py`, `scripts/check_contrast.py`,
  `scripts/og-image.html`
- `apps/web/public/brand/{mark,wordmark}.png`, `apps/web/src/app/{icon,
  apple-icon}.png`, `apps/web/public/og.png` (generated)

**Issues encountered and fixed (all resolved):**

1. TypeScript 7.0.2 (latest) resolved by `bun add typescript` — incompatible
   with `@nestjs/cli`/`ts-jest` (compiler API removed in TS 7). → pinned
   `typescript@^5` (5.9.3) in `apps/api`.
2. `tsconfig` used `baseUrl` (removed option) → dropped; kept
   `moduleResolution: node`.
3. Static `package.json` import inside `src/` shifted the compiler rootDir,
   producing `dist/src/main.js` → replaced with `src/version.ts` plus a
   unit test that asserts sync with `package.json` (read via `fs` in the
   spec, not a static import).
4. NestJS 12 packages ship as ESM (`"type": "module"`); Jest could not
   `require()` them → test scripts run with
   `NODE_OPTIONS=--experimental-vm-modules` (via `cross-env`; requires
   Node ≥ 24.9).
5. ESLint 10 hoisted for the workspace while `eslint-config-next` targets 9
   → pinned `eslint@^9` / `@eslint/js@^9` in `apps/api`.
6. Root `dev` script: `next` not on PATH after `cd apps/web` → invokes
   `./node_modules/.bin/next` explicitly (works under bun, npm and pnpm).
7. Next.js tried to auto-install `@types/node` via npm, which cannot parse
   bun's `workspace:*` protocol → added `@types/node` to `apps/web`
   devDependencies.
8. `src/config/site.ts` initially failed to write (missing directory) →
   created; the resulting module-not-found error surfaced during first dev
   run and was fixed.
9. Dev supervisor restarts were killed with the shell timeout → restarted
   detached via `setsid`.

**Executed commands & results (apps/api):**

| Command | Result |
| --- | --- |
| `bun run typecheck` (tsc --noEmit, strict) | **Pass** (no errors) |
| `bun run build` (nest build) | **Pass** — `dist/main.js` produced |
| `bun run test` (Jest unit) | **Pass — 4/4 tests** |
| `bun run test:e2e` (Jest + supertest) | **Pass — 3/3 tests** (envelope, headers, 404 shape) |
| `bun run lint` (eslint) | **Pass** (no findings) |
| `node dist/main.js` + `curl localhost:4000/api/v1/health` | **Pass** — `{"success":true,"data":{"status":"ok","service":"maasetu-api","version":"0.1.0",...}}`; 404 returns the error envelope; helmet headers verified |

### Steps 3–4 — Brand assets & design foundation

- `scripts/process_brand_assets.py` — content-crop + white→transparent
  conversion of the owner's logos; outputs verified by a vision model:
  backgrounds correctly transparent, all artwork preserved, no halos.
  Assets committed: `mark.png` (900×686), `wordmark.png` (900×216),
  `icon.png` (512, transparent), `apple-icon.png` (180, white bg),
  originals kept in `assets/brand/`.
- `globals.css` — Tailwind 4 `@theme` token system (brand/peach ramps, warm
  neutrals) + shadcn variables mapped to the palette. Interactive pink is
  `brand-500 #DC0E36` (5.05:1 with white); pure `#FD1843` reserved for
  display accents (3.75:1 — large text only).
- Fonts: Fraunces (display serif) + Inter (sans) via `next/font/google`.
- `layout.tsx` — metadata (canonical, OG, Twitter), Organization JSON-LD
  (factual fields only), skip link, sticky-footer flex layout, providers
  (`MotionConfig reducedMotion="user"`).
- `next.config.ts` — `ignoreBuildErrors` **removed**, strict mode on,
  security headers + CSP (prod/dev variants), `allowedDevOrigins` for the
  sandbox preview.

### Steps 5–6 — Components, homepage sections, honest entry points

- Layout: sticky header (desktop nav + patient/doctor login buttons; compact
  icon buttons on small screens), mobile bottom navigation (5 public
  anchors, IntersectionObserver active state, safe-area padding, hidden on
  lg+), footer (logo, contact, legal dialogs, copyright).
- UI: brand button system (AA-verified variants incl. onDark),
  `Reveal` (respects reduced motion), `SectionHeading` (editorial numbering).
- Brand: logo lockup (`next/image`, priority above the fold), original hero
  illustration — hand-built SVG (mother under a warm arch above a dotted
  bridge carrying a heartbeat) with entrance, gentle float, heart pulse and
  arc draw-in animations, all disabled under reduced motion.
- Sections: Hero, About (with "Maa/Setu" pull-quote), Approach (4 pillars,
  honest "in development" chip), How it works (3 steps), For patients,
  For doctors (deep burgundy band), Trust & privacy, FAQ (accessible
  accordion), Contact.
- Dialogs (single-route constraint): patient login, doctor login, privacy
  placeholder, terms placeholder — all honest about status; no fake forms.
- SEO: `robots.ts`, `sitemap.ts`, generated `og.png` (1200×630, rendered
  via headless browser from `scripts/og-image.html`, vision-verified).

**Fixes during QA:** unused import removed (strict TS catch), glyph star
replaced with a Lucide icon (font coverage), muted-text opacities raised to
solid/≥85% for AA, logo wordmark given `priority` (LCP).

### Step 7 — Quality verification (all executed, real results)

| Check | Result |
| --- | --- |
| `apps/web` typecheck (strict) | **Pass** |
| `apps/web` lint | **Pass** |
| `apps/api` typecheck / lint / build | **Pass** (see Step 2) |
| `apps/api` unit tests | **Pass — 4/4** |
| `apps/api` e2e tests | **Pass — 3/3** |
| API live smoke (`/api/v1/health`, 404 envelope, headers) | **Pass** |
| Production build (in an isolated copy of the repo, so the sandbox dev server stayed untouched) | `next build` **pass** — 100% static (`/`, `/_not-found`, `/icon.png`, `/apple-icon.png`, `/robots.txt`, `/sitemap.xml`); standalone server smoke-tested: HTTP 200 with full production security headers (CSP incl. `frame-ancestors`, HSTS, nosniff, Referrer-Policy, Permissions-Policy) |
| API production build + tests in the isolated copy | **Pass** (4/4 unit, 3/3 e2e) |
| Browser verification (headless browser, desktop 1440 / tablet 768 / mobile 390) | **Pass** — layout, hero illustration, dialogs (patient/doctor/privacy), FAQ accordion, bottom-nav click + active state; **0 console errors, 0 page errors, 0 dev-server log errors** |
| Design review (vision model on screenshots) | Clean at all three widths; verdict: "polished, emotionally resonant, structurally flawless… balances medical professionalism with maternal warmth" |
| WCAG AA contrast (`scripts/check_contrast.py`) | **Pass — 21/21 pairs** |

### Known issues & honest notes

- **pnpm not executed in this sandbox** (not installed). The pnpm workspace
  file is provided and the layout follows standard conventions, but
  `pnpm install` itself was **not verified here**; bun was. First local
  setup should confirm it (see DEVELOPMENT_GUIDE troubleshooting).
- The FAQ accordion's automated click was initially blocked by the sticky
  header at the element's exact click point (automation-only actionability
  guard; the accordion itself verified working via direct interaction —
  real users scroll past this naturally).
- The Next.js dev-tools badge ("N") is visible in dev mode only; it does
  not exist in production builds.
- The API runs in this sandbox for verification; it is not exposed
  externally and nothing on the homepage depends on it (static by design).
- OG image, favicon and brand PNGs are generated artifacts — regenerate via
  the scripts rather than editing them.

### Deferred to future phases (explicit)

Authentication (Supabase connection, guards, sessions), database schema +
migrations + RLS policies, patient/doctor/lab/sub-admin/super-admin panels,
clinical workflows (appointments, reports, messaging), rate limiting,
nonce-based CSP, audit logging, final legal texts, deployment pipeline,
real DNS/TLS for maasetu.in.

### Recommended next implementation step

1. **Owner supplies the Supabase project configuration** (URL, anon key,
   service-role key for the API env only, JWT secret).
2. Then, in order: implement the Supabase JWT validation guard in
   `apps/api` → define the role/permission model and first RLS'd schema
   migration → add the first genuinely protected route behind `/api/v1` —
   before any dashboard UI exists.

In parallel, the public website is deployable as-is (fully static build
verified) once real hosting and DNS for `www.maasetu.in` are available;
the login/legal dialogs can become dedicated pages at that point (copy is
already written).

---

## Post-Phase-1 Revision — Hero Illustration v2 (2026-10-09)

### What changed

Owner feedback: the hero figure did not read convincingly as a pregnant
lady. `apps/web/src/components/brand/hero-visual.tsx` was redrawn:

- **Frontal figure → classic side-profile expectant mother.** The baby
  bump is now the natural front of the dress silhouette (a single
  continuous path), not an ellipse appended to the side of an A-line
  dress.
- **Real head in profile** — forehead, nose, lips, chin and jaw as one
  path; closed eye + lash, brow, smile, blush, ear with earring; hair
  pulled back into a low bun with a small flower cluster; hairline
  sweep over the crown.
- **Both arms cradle the bump** — near hand resting on top, far hand
  (shaded deeper skin tone) supporting underneath, with the pulsing
  heartbeat + sonar ring between them.
- **Maternity dress details** — empire seam, three skirt pleats, soft
  sheen along the bump's curve, peach neckline collar, dupatta draped
  over the shoulder hugging the back.
- **Grounded feet** — two side-view shoes peeking beneath the hem above
  the ground shadow (previous figure ended in floating ovals).
- **Bridge draw-in fixed** — the dotted setu now animates via an SVG
  `<mask>` (framer-motion's `pathLength` overrides `stroke-dasharray`,
  which previously would have rendered the dots as a solid line after
  the draw-in); the ECG heartbeat still draws in with `pathLength`.
- All existing brand elements kept: warm arch backdrop, sparkles,
  sprigs, dotted bridge with heartbeat, floating figure, reduced-motion
  support. Only transform/opacity animations.

### Verification actually performed

- `tsc --noEmit` PASS, `eslint .` PASS (apps/web).
- Live browser screenshots at 1440px and 390px (scrolled to the
  illustration) — renders cleanly, no cropping, no collisions.
- Vision-model art-direction review of zoomed crops, iterated three
  rounds (arm length, neck proportion, dupatta attachment, feet size)
  until final verdict: "clearly pregnant at first glance, no glitches,
  APPROVED FOR PRODUCTION" (8.5/10 — remainder is stylistic flat-vector
  minimalism, deliberately kept).
- Browser console + page errors after the change: none.

Not re-run (unchanged by this revision): production build, API tests,
contrast script — no token, build-config or API change was made.
