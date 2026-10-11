# @maasetu/shared

Shared API contract types for MaaSetu.

- Single source of truth for the REST API response/error envelope used by `apps/api`.
- **Type-only in Phase 1.** The package exposes `types` only — no runtime code — so accidental runtime imports fail loudly.
- When runtime utilities are genuinely needed later, add a `tsc` build step and a runtime `main`/`exports` entry at that time.
