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

---

## Website Revision — Multi-Page, Hero Visual, Loading & Performance (2026-10-11)

Owner brief: refine the existing site (do not rebuild) — replace the hero
with a purposeful maternal-healthcare visual, convert the single-page site
into a real multi-page website, add an appropriate branded loading
experience, improve performance/a11y/SEO, keep everything honest, verify,
and update the documentation.

### 1. Hero visual

- Generated 6 illustration candidates with the project's image-generation
  tooling (z-ai CLI, 1024×1024). Two art-direction review rounds using a
  vision model:
  - Candidate A: rendered the prompt's opening words as large visible text
    in the image — rejected.
  - Photorealistic candidates: anatomically clean but read as "AI stock
    photo" (the exact cliché the brief forbids) and clashed with the site's
    flat editorial language — rejected.
  - **Selected: a flat editorial consultation illustration** (expectant
    mother in burgundy + doctor in cream coat with stethoscope). Verified:
    no text artifacts, 5 fingers on every visible hand, clean faces,
    correctly rendered stethoscope, no background-object glitches
    (plant/monitor/frames all clean). Final review: 9.5/10, "production
    ready".
- Integrated as `apps/web/public/images/hero-consultation.png` (88 KB
  source) via `next/image`: `priority`, explicit dimensions, responsive
  `sizes`, and a generated LQIP blur placeholder
  (`scripts/process_hero_asset.py`). The optimizer serves it as ~26 KB
  WebP at 640px.
- Provenance (stated honestly): AI-generated for MaaSetu with the
  project's image-generation tooling during this session; not a
  third-party licensed asset.
- The previous hand-drawn pregnant-mother SVG was **kept** — it now opens
  the About page.
- `og.png` regenerated from `scripts/og-image.html` to feature the
  consultation illustration in the brand arch (VLM-verified: crisp
  wordmark, both faces visible, balanced).
- Added `public/favicon.ico` (from the owner mark) to silence the browser's
  legacy `/favicon.ico` 404.

### 2. Multi-page conversion

**Gateway re-test first:** the sandbox Caddyfile's default handler proxies
*all* paths to the Next.js server — every route verified 200 through
:81. The Phase 1 "single route" assumption was over-cautious, so real
routes were built.

Routes added (all server components, all static, each with own metadata,
canonical and OG image; sitemap lists all 8):

- `/about` — mission story + relocated mother SVG, name band, four values
  (numbered editorial rows), honest status panel.
- `/services` — care-journey diagram (new hand-drawn SVG: mother above the
  dotted setu + heartbeat, three support pillars), four service areas as
  alternating rows with "what this may include" + "Status: in development".
- `/patients` — centered hero, four design-intent blocks, promise quote,
  honest access status + login dialog CTA.
- `/doctors` — burgundy band with intended tools, "questions we are asking
  doctors" section, partner CTA (mailto with subject).
- `/contact` — two channel cards (email/Instagram), "worth knowing" notes
  (no-medical-details notice; why there is no form), audience routing. No
  fake form: the NestJS API has only /health, and a mailto is the truthful
  option.
- `/privacy`, `/terms` — stage-accurate legal-information pages (numbered
  sections, breadcrumbs, "last updated", no invented certifications or
  legal review).
- `not-found.tsx` — branded 404 ("This bridge doesn't lead anywhere yet").

Home re-composed: Hero → Approach (01) → How it works (02) → Audience
entry panels (03, new) → Trust (04) → FAQ (05) → Contact CTA band.
Sections whose content moved to pages (`about`, `for-patients`,
`for-doctors`, `contact`) were retired after relocation — content was
preserved, not deleted.

**Navigation:** `config/site.ts` now drives routes (`mainNav`,
`mobileNav`, `publicRoutes`, shared `ogImage`). Header: logo → `/`,
desktop nav with `aria-current` active states (new client component
`main-nav-links.tsx`), mobile adds a contact icon link; login dialogs kept
as the honest placeholder destination. Mobile bottom nav rewritten
route-based (`usePathname`) — the IntersectionObserver scroll-tracking was
removed (less JS, works on every route). Footer: real links to
`/privacy` + `/terms` (the legal dialogs were removed with their content
migrated).

### 3. Loading experience (decision + implementation)

**No blocking branded preloader, no `loading.tsx`, skeletons nowhere.**
Documented rationale: all routes are static and server-rendered — content
is ready at first paint, so a gate would only add waiting. The one genuine
loading need (above-the-fold hero image) uses the blur-up LQIP with zero
layout shift; the hero image has *no* entrance animation so nothing waits
on JavaScript. Decisions recorded in ARCHITECTURE.md. Reduced-motion: all
animated components already check `useReducedMotion()`; verified the site
loads correctly under an emulated `prefers-reduced-motion`.

### 4. Verification actually executed

- `tsc --noEmit` (web): **pass**. `eslint .` (web): **pass**.
- API untouched but re-verified: unit **4/4 pass**, e2e **3/3 pass**;
  `GET /api/v1/health` 200 live (and via gateway `?XTransformPort=4000`).
- Production build in an isolated mirror (sources + `bun install
  --frozen-lockfile`; never built against the live sandbox app):
  `next build` **pass** — 14 static routes (8 pages + 404 + icons/robots/
  sitemap), TypeScript strict clean.
- Standalone production server (port 3100): all 8 routes 200, unknown
  route 404, full security headers verified (CSP incl. frame-ancestors,
  HSTS, nosniff, Referrer-Policy, Permissions-Policy).
- Measured Web Vitals on the production build (Chromium, localhost, **no
  network throttling** — honest limitation): home desktop FCP 324 ms /
  LCP 620 ms (LCP element = hero IMG) / CLS 0; about FCP 84 ms / LCP
  184 ms / CLS 0; home mobile-390 FCP 72 ms / LCP 908 ms (LCP = hero
  text) / CLS 0. Lighthouse CLI is not available in this sandbox — the
  Performance API numbers above are the equivalent measurement actually
  obtained.
- Browser verification (fresh session, zero console/page errors):
  desktop 1440, tablet 768, mobile 390 across all pages; nav active
  states verified in the DOM (`aria-current`); patient-login dialog opens;
  FAQ accordion opens; hero CTA navigates to /patients; footer legal links
  navigate; bottom-nav/footer clearance measured geometrically (copyright
  bottom 928px vs nav top 971px on tablet — 43px clear).
- VLM design review of all pages: distinct layouts confirmed per page
  (home hero-split; about asymmetric prose+art; services modular rows;
  patients centered+grid; doctors dark split; contact cards; legal
  article layouts). Ratings: doctors 9/10, contact 9/10, privacy 10/10,
  terms 10/10, home 8/10.

### 5. Issues encountered and fixed

1. Rewriting `config/site.ts` (anchor `id` → route `href`) before the
   bottom nav briefly broke every page ("Element type is invalid" —
   `navIcons[item.id]` → undefined). Fixed by rewriting the bottom nav in
   the same change; stale error entries remained in the browser session
   log until a fresh session confirmed zero errors.
2. `lucide-react@0.525` has no `MagnifyingGlassHeart` export — swapped to
   `UserRoundSearch`.
3. Unused `BRAND_300` constant in the new care-journey diagram — removed.
4. A multi-edit on `trust.tsx` applied only partially (import line updated
   while the `PrivacyDialog` usage remained) causing a transient
   `ReferenceError: PrivacyDialog is not defined` in dev — completed the
   edit cleanly, re-verified.
5. Isolated production build: copying bun's symlinked `node_modules` with
   `cp -rL` breaks bin shims and transitive resolution; a full-`tar` copy
   conflicts with the live dev server. Solution: source-only mirror +
   `bun install --frozen-lockfile`. Next.js also inferred the workspace
   root from the lockfile, emitting the standalone server at
   `.next/standalone/<path>/apps/web/server.js` — documented in
   DEVELOPMENT_GUIDE.md.
6. The heavy copy/build operations killed the sandbox dev server and API
   (memory pressure). Both restarted (web via the root dev script on
   :3000; API via `bun run start:dev` on :4000) and re-verified healthy,
   including through the gateway. Restart procedure documented.

### 6. Dependencies & files

- No new npm packages. No new backend endpoints (API untouched).
- New: 8 page routes, `not-found.tsx`, `page-hero.tsx`, `breadcrumb.tsx`,
  `legal.tsx` shells, `main-nav-links.tsx`, `care-journey.tsx`,
  `audience-entry.tsx`, `contact-cta.tsx`, `public/images/` (hero),
  `public/favicon.ico`, `scripts/process_hero_asset.py`.
- Retired (content relocated, not lost): section components `about.tsx`,
  `for-patients.tsx`, `for-doctors.tsx`, `contact.tsx`; the legal dialogs
  (`PrivacyDialog`/`TermsDialog`) from `notice-dialogs.tsx`.

### Recommended next implementation step

Unchanged from Phase 1: the owner supplies the Supabase project
configuration → JWT validation guard in `apps/api` → role/permission model
+ first RLS'd schema migration → first genuinely protected route. The
public website is deployable as-is (fully static build verified with
measured Core Web Vitals).

---

## Final Frontend Refinement, Bug Fixes & Backend Readiness (2026-10-11)

Owner brief: polish the existing site without rebuilding — fix the About
and Services illustrations, correct the hero supporting line to the exact
Hinglish wording, replace the red heartbeat word treatment with a designed
icon, fix the "preloader", address the speed regression, fix remaining
errors, add the Sankhya Stack footer credit, prepare for the backend
phase, verify everything, and document honestly.

### 1. Repository audit (before any change)

- Git clean at `b8bcca3` (Task-4 state). Web typecheck + lint: **pass,
  zero errors**. Dev log: all routes 200; no errors.
- Browser audit across all 8 routes: **zero page errors**; exactly one
  console warning on every route — Next.js `scroll-behavior: smooth`
  without `data-scroll-behavior` on `<html>`.
- **No preloader component exists anywhere in the codebase** (Providers
  holds only `MotionConfig`; there is no loading.tsx, no gate, no timer).
  The "preloader not working" report was investigated and root-caused
  (see §4).
- About page audit: exactly one illustration (the retired hero SVG — a
  solo mother figure), no mother–doctor relationship, no coordinated-care
  communication, vertical imbalance against the long prose column.
- Services page audit: care-journey diagram + four service rows with
  small lucide icons only — no per-service visuals.
- Asset audit: `public/brand/mark.png` was still the 2000×2000 247 KB
  original being processed by the image optimizer for a 34 px header
  display (the real, measurable image-workload regression).

### 2. Visual work

**Hero (home):**
- Supporting line replaced with the exact owner wording:
  **"Bharat se, Bharat ki Maaon ke liye"** (verified character-for-
  character in the served DOM; the pill keeps its HeartPulse icon).
- The red `heartbeat` word treatment removed; replaced by a designed
  **ECG pulse mark** — an inline SVG drawn for the brand (96×32 viewBox,
  brand red, round caps, `pathLength=100`) that sits inside the headline
  between "first" and "heartbeat", sized in em so it scales with the
  responsive type. It animates once via a 12-line CSS keyframe
  (`ecg-draw`, 1.2 s, 0.45 s delay, no looping, no JS) and is fully
  static under `prefers-reduced-motion` (override verified present in
  the compiled CSS). `aria-hidden` — decorative.
- Hero paragraph polished to natural Hinglish ("…trusted doctors,
  organised diagnostics, aur calm, reliable guidance — sab ek hi
  coordinated journey mein."), keeping the honest in-development note.

**About page:**
- New mission illustration: a pregnant Indian mother in a burgundy saree
  and her gynecologist at a clinic table, the doctor pointing at a
  pregnancy timeline chart — the coordinated-care scene the page argues
  for. Generated for MaaSetu with the project image-generation tooling
  (z-ai CLI, 1024×1024, 77 KB); art-directed via two VLM rounds
  (9.5/10 "publication-ready") plus a pixel-level zoom defect scan of
  hands/faces/chart/stethoscope (**CLEAN**). Provenance: AI-generated
  for MaaSetu during this session — not a third-party licensed asset.
- Presented in the brand's **arch motif** (rounded-t arch crop, peach
  ring, soft shadow) with a meaningful caption, so it reads distinctly
  from the homepage hero. Integrated via `next/image` with generated
  LQIP blur placeholder, explicit dimensions, responsive `sizes`,
  lazy-loaded (below the fold on mobile). `scripts/process_about_asset.py`
  added (asset + LQIP pipeline).
- The retired solo-mother SVG (`hero-visual.tsx`) is now unused and was
  deleted (no dead files).

**Services page:**
- Four **hand-drawn SVG spot diagrams** (`service-visuals.tsx`), one per
  service area, sharing the care-journey visual DNA (dotted setu lines,
  heartbeat, arch, brand palette): timeline with milestones + heartbeat +
  heart (care coordination), mother + doctor busts held by a dotted arc
  with heartbeat (consultations), test tube → verified report (diagnostics),
  stage-marker chips above an open book (health information). Static,
  server-rendered, zero client JS, `aria-hidden` (adjacent copy carries
  meaning).
- Card layout updated (flex-wrap left column) so the diagrams stack
  cleanly on mobile — verified geometrically: 300×195 inside 358 px cards.
- VLM review of both pages: care-journey + all four spots render clean,
  style-consistent, content-matched; About composition rated excellent.

### 3. Footer credit (shared component, all public pages)

- Exact owner wording implemented once in `site-footer.tsx`, below the
  primary footer content with its own hairline separator:
  "Crafted with code and curiosity by Sankhya Stack 💡 Made in — पाटलिपुत्र"
- "Made in — पाटलिपुत्र" is a `whitespace-nowrap` unit (never breaks;
  measured 111 px single-line on 390 px viewport) and renders in
  **Noto Sans Devanagari** loaded through `next/font/google`
  (self-hosted, `--font-devanagari` variable, devanagari subset, weight
  400) because the sandbox has no system Devanagari font (would render
  tofu) and OS fallbacks are unreliable. Font lazy-loads (not preloaded).
- Visually secondary: 13 px, `text-ink-soft/90`, centered; contrast
  verified **5.89:1** (AA pass). VLM-verified proper glyph rendering.
- Verified present in the served DOM on all 8 public routes.

### 4. Loading strategy ("preloader") — root cause and resolution

**Finding: there is no preloader in the codebase to fix.** The perceived
"broken preloader" decomposes into three real causes, all addressed:

1. **Above-fold copy was opacity-gated until JS hydration.** The hero
   headline/paragraph/CTAs were wrapped in framer-motion `Reveal`
   (`initial opacity:0`), so they rendered invisible in the SSR HTML and
   only appeared after the client bundle hydrated. On the dev-server
   preview (and any slow connection) this reads exactly as a stuck
   loader. **Fix:** the entire hero copy block is now plain
   server-rendered HTML — verified `opacity:0` count in the served hero
   section is zero. Reveal remains only for below-the-fold sections.
2. **Dev-mode compile time on first visit** (sandbox preview runs
   `next dev`): measured 3.5 s compile for `/` on cold cache, then
   40–130 ms per route. This is a property of the development server,
   not the product — the production build prerenders all 14 routes
   static (build verified; vitals below).
3. **Hero/brand image work on cold cache**: the LQIP blur-up is the
   intended loading experience and stays; the image-optimizer workload
   was cut by resizing the logo sources (see §5).

**Final strategy (unchanged in architecture, now documented):** static
SSR-first pages; the LCP image uses `priority` + LQIP blur-up; no
full-screen gate, no timers, no artificial delays, no loading.tsx (no
genuinely async route segments exist); Devanagari font lazy-loads via
`display: swap`. All ten behaviours in the owner's checklist are met —
notably: nothing can remain "stuck" because nothing waits on state.

### 5. Performance regression — causes and fixes

**Investigated causes (evidence-based):**
- Dev-server preview (compile on demand) — dominant cause of perceived
  slowness; not a product defect (production numbers below).
- 2000×2000 / 247 KB `mark.png` being optimized per request for a 34 px
  header mark (and 107 KB wordmark at 900 px wide).
- The hydration-gated hero copy (§4.1) delaying visible content.

**Fixes applied:**
- Logo sources resized for the web (mark 512×390 = 114 KB, wordmark
  512×123 = 48 KB; originals preserved in `assets/brand/`); `logo.tsx`
  dimension constants updated; favicon regenerated from the resized mark.
  The optimizer now emits a **2.7 KB** mark at 96 px (previously
  processing a 2000 px original).
- Hero copy ungated (§4.1) — LCP text paints with the HTML.
- No changes to fonts beyond adding the lazy Devanagari subset; no new
  dependencies; no functionality removed.

**Measured results (production standalone build, localhost, no
throttling, fresh browser contexts per route):**

| Route | FCP | LCP | CLS |
| --- | --- | --- | --- |
| Home (1440) | 476 ms | 400 ms | 0 |
| Home (390) | 332 ms | 404 ms | 0 |
| About (1440) | 320 ms | 1284 ms* | 0 |
| Services (1440) | 324 ms | 348 ms | 0 |
| Patients (1440) | 404 ms | 252 ms | 0 |
| Doctors / Contact / Privacy / Terms | 228–384 ms | — | 0 |

\* About's LCP is the lazy-loaded mission illustration, partially
in-view on desktop's first viewport; within the "good" threshold and
correctly *not* prioritized on mobile where it is below the fold.

Payload audit (home): HTML 21 KB gz (122 KB raw), **210 KB compressed JS
across 14 files** (React + Next runtime + framer-motion for the
interactive components — Reveal/nav/dialogs/accordion), 133 KB fonts
(Inter + Fraunces variable subsets, 3 files preloaded), ~103 KB images
(hero 75 KB optimized + logos). Lighthouse CLI is not available in this
sandbox; the Performance API numbers above are the measurements actually
obtained.

### 6. Error fixes

- `scroll-behavior` warning → `data-scroll-behavior="smooth"` added to
  `<html>`; fresh-reload console now completely clean on all routes
  (previously one warning per route).
- Transient dev-only module-not-found (a mis-typed import path during
  editing) — corrected immediately; verified by clean reload.
- Link integrity: all 8 pages crawled, all internal anchor targets
  resolve (`scripts/check_links.py`, checked against the production
  build).
- No TypeScript, ESLint, hydration, key, nesting, image-src or metadata
  errors found — web typecheck/lint pass and the browser audit shows
  zero console/page errors on every route.
- Sandbox environment issues (documented, not product defects): the dev
  web server and the standalone measurement server are killed by
  sandbox memory pressure between sessions; restart procedures are in
  DEVELOPMENT_GUIDE.md. The monorepo standalone build serves from
  `.next/standalone/scripts/prod-build/web/apps/web/` and needs
  `static/` + `public/` copied there (script updated).

### 7. Verification summary (this revision)

- Web: `tsc --noEmit` **pass**, `eslint` **pass**.
- API: unit **4/4 pass**, e2e **3/3 pass** (unchanged code, re-run for
  the record); live `/api/v1/health` 200.
- Production build in isolated mirror: **pass**, 14 static routes
  (8 public + icons/robots/sitemap/404).
- Standalone server: all routes 200; CSS/woff2/chunk/image requests all
  200 after fixing the monorepo asset-copy level.
- Browser: desktop 1440 / tablet 768 / mobile 390 — no horizontal
  overflow on any route; footer credit single-line on mobile; bottom-nav
  clearance intact; ECG mark renders in SSR HTML; VLM review of changed
  pages clean (footer, services spots, about composition, hero
  headline).
- WCAG AA: 21/21 token checks pass; footer credit 5.89:1; ECG pink on
  canvas 3.75:1 (graphical object, ≥3:1); reduced-motion override for
  `ecg-trace` verified in compiled CSS.

### 8. Backend readiness (frontend integration audit)

- The web app uses **no environment variables** (only NODE_ENV for CSP);
  no API client, no data fetching, no auth SDK — nothing is coupled to
  mock data. All pages are static server components; interactive islands
  are nav/dialog/accordion/reveal only.
- Login entry points are honest dialogs documenting the future subdomains
  (`maa.`, `doctors.maasetu.in`) — replace with real Supabase auth
  redirects when backend phase lands.
- Contact page is mailto-only by design (no endpoint exists for a form);
  a future form needs a NestJS endpoint + validation + spam protection.
- Type contracts await the backend: `packages/shared` is type-only and
  ready to carry DTO types; no duplicated business rules exist in the
  frontend.
- Required from owner: Supabase project URL + anon key (browser-safe),
  service-role key + JWT secret (server-only), CORS allowlist update for
  the production origin.
- Recommended backend order: (1) JWT validation guard in apps/api,
  (2) role/permission model + RLS'd schema migration, (3) first protected
  route behind the guard, (4) then frontend API client + login redirects.

### 9. Files changed

Modified: `hero.tsx`, `layout.tsx`, `globals.css`, `site-footer.tsx`,
`logo.tsx`, `about/page.tsx`, `services/page.tsx`, `public/brand/mark.png`
+ `wordmark.png` (resized), `public/favicon.ico`, README.md, docs/*
(all five), worklog.
Added: `components/brand/service-visuals.tsx`,
`public/images/about-consultation.png`, `scripts/process_about_asset.py`,
`scripts/prod_build.sh`, `scripts/measure_vitals.sh`,
`scripts/measure_lcp_bytes.sh`, `scripts/check_links.py`.
Deleted: `components/brand/hero-visual.tsx` (fully superseded).
No new npm dependencies; API untouched.
