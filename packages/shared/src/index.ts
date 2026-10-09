/**
 * Shared API contract types for MaaSetu.
 *
 * This package is the single source of truth for the shape of the REST API
 * contract between `apps/api` (NestJS) and any future consumers.
 *
 * Phase 1 contract rules:
 * - Every successful response is wrapped:  { success: true, data: T }
 * - Every error response is wrapped:       { success: false, error: ApiErrorBody }
 * - Error messages shown to clients must be safe to expose; internal details
 *   are logged server-side only (see apps/api/src/common/filters).
 *
 * This package intentionally contains types only. It exposes no runtime
 * entry point, so it cannot accidentally become runtime code. When runtime
 * utilities are genuinely needed in a later phase, add a build step then.
 */

/** Payload returned by `GET /api/v1/health`. */
export interface HealthData {
  status: 'ok';
  /** Identifier of the running service, e.g. "maasetu-api". */
  service: string;
  /** Semantic version of the API package. */
  version: string;
  /** ISO-8601 timestamp of the response. */
  timestamp: string;
}

/** Standard error body returned by every failing endpoint. */
export interface ApiErrorBody {
  /** Machine-readable error code, e.g. "NOT_FOUND". */
  code: string;
  /** Safe, human-readable message for API clients. */
  message: string;
  /** Optional structured details (e.g. validation field errors). */
  details?: unknown;
}

/** Envelope for successful responses. */
export interface ApiSuccess<TData> {
  success: true;
  data: TData;
}

/** Envelope for failed responses. */
export interface ApiFailure {
  success: false;
  error: ApiErrorBody;
}

/** Discriminated union of all API responses. */
export type ApiResponse<TData> = ApiSuccess<TData> | ApiFailure;
