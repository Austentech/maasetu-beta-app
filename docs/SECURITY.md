# MaaSetu — Security

Phase 1 is a public website plus an API foundation. This document records
the security posture that exists today, the plan for the full product, and
— honestly — the work that remains.

## Secret management

- **No secrets are committed.** `.gitignore` excludes `.env`, `.env.local`,
  `apps/*/.env*` (while keeping `.env.example`).
- `.env.example` documents every variable the owner may need to supply,
  with future Supabase variables explicitly marked *not yet in use*. No
  real keys have ever been placed in the repository.
- **The Supabase service-role key (future) must never reach the browser.**
  It belongs only in `apps/api/.env`, which is server-side. Browser-safe
  values (`NEXT_PUBLIC_SUPABASE_*`) are the only frontend variables.
- Phase 1 collects **no patient medical information** anywhere.

## What is implemented today

### Website (`apps/web`)

- **Security headers + CSP** (in `next.config.ts`, applied to all routes —
  re-verified against the production standalone build after the multi-page
  conversion, on every public route):
  - `Content-Security-Policy` — restrictive; `frame-ancestors 'self'` plus
    the sandbox preview origin in production. Development relaxes
    `script-src` (`unsafe-eval` for Turbopack HMR) and omits
    `frame-ancestors` so the sandbox preview iframe can embed the app.
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(),
    payment=(), usb=()`
  - `Strict-Transport-Security` (production only — HSTS is meaningless over
    local HTTP dev)
  - `X-Powered-By` removed.
  - Verified live against the production standalone server (see
    IMPLEMENTATION_LOG.md).
- **No unsafe HTML rendering.** The only `dangerouslySetInnerHTML` in the
  codebase renders a static, code-authored JSON-LD object.
- **Fonts are self-hosted by the build** (`next/font/google` downloads at
  build time and serves from `/_next/static`), including the Noto Sans
  Devanagari subset added for the footer credit — no runtime requests to
  third-party font CDNs, consistent with the CSP's `font-src 'self'`.
- **No client-side secrets, no auth state, no PII** in the public app.
- **The contact page uses real channels only** — `mailto:` links and a
  public Instagram profile. There is no contact form, because there is no
  backend endpoint to submit one to; nothing pretends otherwise, and no
  data is entered or transmitted from any public page.
- React strict mode enabled; strict TypeScript.

### API (`apps/api`)

- **Security headers** via `helmet` (CSP disabled deliberately: a JSON API
  serves no documents; browser-facing CSP belongs to the website).
- **CORS allowlist** from validated environment config — only approved
  browser origins may call the API; empty list = no browser origins.
- **Request validation** — global `ValidationPipe` with `whitelist` and
  `forbidNonWhitelisted`: unknown properties are **rejected**, not ignored.
- **Validated environment** — the process refuses to start with invalid
  configuration (fail fast, readable errors, no secret values echoed).
- **Centralized error handling** — 5xx responses are generic; stack traces
  and real messages go to server logs only. No credentials, tokens or
  health data are logged anywhere in the current codebase.
- **Minimal health endpoint** — liveness only; no dependency, database or
  infrastructure diagnostics are exposed.
- **No credentials in application tables** — there are no tables; the
  future auth design keeps all credentials inside Supabase Auth.

## Authorization plan (implementation deferred)

The full model is specified in `docs/ARCHITECTURE.md`. Principles:

1. **The API is the authorization authority.** Guards and policies verify
   Supabase-issued JWTs server-side and enforce least-privilege decisions
   per route and resource — including tenant boundaries, staff-to-doctor
   relationships and department scoping. **A role value supplied by the
   browser is never trusted.**
2. **RLS is the backstop.** PostgreSQL Row Level Security policies will
   mirror the documented permission model at row level; the API and RLS are
   designed together so they never conflict or redundantly diverge.
3. **No password storage** in application tables, ever — Supabase Auth owns
   credentials.

## Outstanding security work (tracked, honest)

- [ ] Rate limiting for authentication and sensitive endpoints (planned
      with the first real endpoints — e.g. `@nestjs/throttler`).
- [ ] Nonce-based CSP for the website (replaces `script-src 'unsafe-inline'`;
      requires middleware or static-generation-compatible nonce strategy).
- [ ] Supabase JWT validation guard + authorization module (with the first
      protected endpoints; requires owner-supplied project configuration).
- [ ] Database schema, migrations and documented RLS policies.
- [ ] Secure cookie/session settings where applicable (with real sessions).
- [ ] Audit logging and request-id correlation.
- [ ] Dependency vulnerability scanning in CI.
- [ ] Final Privacy Policy and Terms of Service (legal, not code — but
      required before any user data is collected).

## A note on honesty

Patterns are not proof. The existence of headers, validation and tests does
**not** by itself make MaaSetu production-secure — the items above are
real, tracked work. This document deliberately avoids claiming compliance
certifications (HIPAA/ISO/ABDM) that MaaSetu has not been assessed against.
Any future compliance claims will be made only after verification.
