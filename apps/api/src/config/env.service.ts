import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { EnvModel } from './env.validation';

/** Typed access to the validated environment configuration. */
@Injectable()
export class EnvService {
  constructor(private readonly config: ConfigService<EnvModel, true>) {}

  get nodeEnv(): EnvModel['NODE_ENV'] {
    return this.config.get('NODE_ENV', { infer: true });
  }

  get port(): number {
    return this.config.get('PORT', { infer: true });
  }

  /** Parsed CORS allowlist (an empty list means no browser origins allowed). */
  get corsAllowedOrigins(): string[] {
    const raw =
      this.config.get('CORS_ALLOWED_ORIGINS', { infer: true }) ?? '';
    return raw
      .split(',')
      .map((origin) => origin.trim())
      .filter((origin) => origin.length > 0);
  }
}
