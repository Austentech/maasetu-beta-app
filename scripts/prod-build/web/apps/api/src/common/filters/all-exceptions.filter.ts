import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import type { ApiFailure } from '@maasetu/shared';

const GENERIC_SERVER_ERROR_MESSAGE =
  'Something went wrong. Please try again later.';

interface NormalizedHttpError {
  status: number;
  code: string;
  message: string;
}

/**
 * Centralized error handling: every failure leaves the API as
 * `{ success: false, error: { code, message } }`.
 *
 * Unexpected (non-HttpException) errors and 5xx responses are logged
 * internally with stack traces but answered with a generic message —
 * internals, file paths, or dependency details never leak to clients.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const normalized = this.normalize(exception);

    if (normalized.status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      // Internal logging only — never returned to the client.
      this.logger.error(
        `Request failed (${normalized.code}): ${normalized.internalMessage}`,
        normalized.stack,
      );
    }

    const body: ApiFailure = {
      success: false,
      error: { code: normalized.code, message: normalized.message },
    };
    response.status(normalized.status).json(body);
  }

  private normalize(
    exception: unknown,
  ): NormalizedHttpError & { internalMessage: string; stack?: string } {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      // Reverse-maps the status enum, e.g. 404 -> "NOT_FOUND".
      const code = HttpStatus[status] ?? 'HTTP_ERROR';
      const payload = exception.getResponse();
      const stack = exception.stack;

      let message: string;
      if (typeof payload === 'string') {
        message = payload;
      } else if (
        typeof payload === 'object' &&
        payload !== null &&
        'message' in payload
      ) {
        const raw = (payload as { message?: unknown }).message;
        // class-validator arrays arrive as `message: string[]`.
        message = Array.isArray(raw) ? raw.join(', ') : String(raw);
      } else {
        message = exception.message;
      }

      if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        return {
          status,
          code,
          message: GENERIC_SERVER_ERROR_MESSAGE,
          internalMessage: message,
          stack,
        };
      }

      // 4xx messages (e.g. validation details) are safe to expose.
      return { status, code, message, internalMessage: message, stack };
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_ERROR',
      message: GENERIC_SERVER_ERROR_MESSAGE,
      internalMessage:
        exception instanceof Error ? exception.message : String(exception),
      stack: exception instanceof Error ? exception.stack : undefined,
    };
  }
}
