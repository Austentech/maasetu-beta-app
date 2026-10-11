# MaaSetu — Development Guide

## Prerequisites

| Tool | Version | Why |
| --- | --- | --- |
| Node.js | **≥ 24.9** | Runtime for both apps; tests rely on native `require(esm)` support for ESM packages (NestJS 12 ships ESM) |
| pnpm | ≥ 9 | Recommended package manager (`pnpm-workspace.yaml`) |
| bun | ≥ 1.3 | Alternative — used by the current hosting sandbox (`bun.lock` is committed) |

TypeScript 5.x is pinned in both apps deliberately: TypeScript 7 does not
yet expose the compiler API required by `@nestjs/cli` and `ts-jest`. Bump
collectively when the toolchain catches up.

## Installation

```bash
git clone <repository-url> maasetu
cd maasetu
pnpm install        # or: bun install
```

## Environment setup

Phase 1 needs **no** environment variables to run:

- The website has no configuration.
- The API has safe development defaults (`PORT=4000`,
  `CORS_ALLOWED_ORIGINS=http://localhost:3000`, `NODE_ENV=development`).

When you begin adding real configuration, copy the relevant block from
`.env.example` (repository root) into:

- `apps/api/.env` — backend variables
- `apps/web/.env.local` — frontend variables

Never commit real secrets. See `docs/SECURITY.md`.

## Everyday commands

### Website (`apps/web`)

```bash
cd apps/web
pnpm dev          # dev server on http://localhost:3000
pnpm build        # production build (standalone output)
pnpm start        # serve the production build
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit (strict)
```

### API (`apps/api`)

```bash
cd apps/api
pnpm start:dev    # nest start --watch → http://localhost:4000/api/v1/health
pnpm build        # compile to dist/
pnpm start:prod   # node dist/main.js
pnpm lint         # ESLint (typescript-eslint)
pnpm typecheck    # tsc --noEmit (strict)
pnpm test         # Jest unit tests
pnpm test:e2e     # Jest e2e tests (supertest against the real pipeline)
```

### Root orchestration

`pnpm dev`, `pnpm dev:api`, `pnpm build`, `pnpm lint`, `pnpm typecheck`,
`pnpm test` — each delegates to the relevant workspace packages.

## Tooling notes & decisions

- **Tests require a Node flag.** NestJS 12 packages ship as ESM; Jest's
  native `require(esm)` bridge needs `--experimental-vm-modules`. The test
  scripts already include it via `cross-env` — nothing to remember.
- **TypeScript strict everywhere.** `strict`, `noImplicitAny`,
  `noUnusedLocals`, `noUnusedParameters` are on in both apps;
  `ignoreBuildErrors` is removed from the Next config. Type errors fail the
  build — by design.
- **Brand asset pipeline.** `python3 scripts/process_brand_assets.py`
  regenerates `apps/web/public/brand/*`, the favicon and the Apple touch
  icon from `assets/brand/` (requires Pillow + NumPy). Re-run it if the
  owner supplies new logo sources; never hand-edit the derived assets.
- **Hero image pipeline.** `python3 scripts/process_hero_asset.py` copies
  the selected consultation illustration into
  `apps/web/public/images/hero-consultation.png` and regenerates the LQIP
  blur placeholder consumed by the hero component. If the hero artwork is
  ever replaced, re-run this script and paste the printed base64 into the
  `HERO_BLUR_DATA_URL` constant in `src/components/sections/hero.tsx`.
- **OG image.** Rendered from `scripts/og-image.html` (1200×630) via a
  headless-browser screenshot; regenerate `apps/web/public/og.png` if brand
  or copy changes. The HTML references the current hero illustration via
  `scripts/og-assets/` — re-stage those files if imagery changes.
- **Contrast checks.** `python3 scripts/check_contrast.py` verifies every
  token pair used in the UI against WCAG AA. Run it after touching
  `globals.css` or button variants.

## Sandbox-specific behaviour (this workspace)

- The platform supervisor (`.zscripts/dev.sh`, not part of the product)
  runs `bun install` → `bun run db:push` (no-op) → `bun run dev` (port 3000)
  and keeps a dev-server log at `apps/dev.log` (the root `dev` script
  tees output there). If the dev server dies (e.g. under memory
  pressure), restart it with the root script: `cd apps/web &&
  ./node_modules/.bin/next dev -p 3000` (or `bun run dev` at the root).
- The sandbox gateway (Caddy, port 81) proxies **all paths** to the web
  app — every public route is user-visible through the sandbox preview.
  Login entry points remain dialogs because the portals do not exist yet.
- The API (port 4000) is not exposed externally; the frontend can reach
  local services through the gateway using relative paths with
  `?XTransformPort=<port>`.
- Production builds must not be run against the live sandbox app. Build in
  an isolated mirror instead: copy the sources (excluding `node_modules`
  and `.next`), run `bun install --frozen-lockfile` inside the mirror, then
  `bun run build` in `apps/web`. This is how the production build and the
  Web Vitals measurements were verified — see IMPLEMENTATION_LOG.md.
  Note: heavy copies (tar of the whole `node_modules`) can kill the
  dev/API servers through memory pressure; prefer source-only mirrors.
  In a monorepo, Next.js infers the workspace root from the lockfile and
  emits the standalone server at
  `.next/standalone/<path-from-root>/apps/web/server.js` — run it from
  that directory.

## Troubleshooting

| Symptom | Cause & fix |
| --- | --- |
| `next: command not found` when running a root script that `cd`s into `apps/web` | Run scripts through the package manager (`pnpm dev` / `bun run dev`), which puts the workspace `.bin` on PATH; or run `pnpm dev` inside `apps/web`. |
| Jest fails with `Must use import to load ES Module` | The test scripts must run with `--experimental-vm-modules` (already configured via `cross-env`). Ensure Node ≥ 24.9. |
| Jest/ts errors mention TypeScript 7 | TypeScript must stay on 5.x until `@nestjs/cli` and `ts-jest` support 7. Both apps pin `typescript@^5`. |
| Nest build output lands in `dist/src/` | Something under `src/` imports a file outside `src/` (e.g. a static `package.json` import). Keep such reads in tests, or use runtime `fs` reads. |
| Fonts fail to load during build | `next/font/google` downloads fonts at build time; ensure network access or cache them in CI. |
| Dev server shows cross-origin warnings for `/_next/*` | Expected in the sandbox preview; `allowedDevOrigins` is already configured for the preview domain. |
| API tests pass but API won't start | Check `apps/api/.env` — invalid values fail fast at boot by design, with a readable summary. |
