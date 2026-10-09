import { ValidationPipe, VersioningType } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseEnvelopeInterceptor } from './common/interceptors/response-envelope.interceptor';
import { EnvService } from './config/env.service';

/**
 * Applies the full HTTP pipeline (security headers, CORS allowlist, URI
 * versioning, payload validation, response/error conventions) to an app.
 *
 * `main.ts` and the e2e tests both call this function, so the behaviour
 * under test is exactly the behaviour that runs in production.
 */
export function configureApp(app: INestApplication): void {
  const env = app.get(EnvService);

  // Security headers. CSP is disabled for this JSON-only API — it serves no
  // HTML documents. Browser-facing CSP belongs to the Next.js web app
  // (see apps/web/next.config.ts and docs/SECURITY.md).
  app.use(helmet({ contentSecurityPolicy: false }));

  // CORS allowlist: only approved browser origins may call the API.
  app.enableCors({
    origin: env.corsAllowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // REST versioning: every route lives under /api/v1.
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // Validate and transform every incoming request payload.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // One response shape and one error shape for every endpoint.
  app.useGlobalInterceptors(new ResponseEnvelopeInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
}
