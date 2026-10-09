import { plainToInstance } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

const KNOWN_ENVIRONMENTS = ['development', 'production', 'test'] as const;

/**
 * Validated environment variables for the API.
 *
 * Every new environment variable must be declared here — startup fails fast
 * when configuration is missing or malformed, instead of failing later at
 * request time.
 */
export class EnvModel {
  @IsIn(KNOWN_ENVIRONMENTS)
  NODE_ENV!: (typeof KNOWN_ENVIRONMENTS)[number];

  @IsInt()
  @Min(1)
  @Max(65535)
  PORT!: number;

  /** Comma-separated CORS origin allowlist. */
  @IsOptional()
  @IsString()
  CORS_ALLOWED_ORIGINS?: string;
}

/** Explicit defaults — the API runs with zero configuration in development. */
const DEFAULTS: Record<string, string | number> = {
  NODE_ENV: 'development',
  PORT: 4000,
  CORS_ALLOWED_ORIGINS: 'http://localhost:3000',
};

/**
 * Validate and normalize `process.env` for `@nestjs/config`.
 * Throws with a readable summary when configuration is invalid.
 */
export function validateEnv(raw: Record<string, unknown>): EnvModel {
  const merged = { ...DEFAULTS, ...raw };
  const env = plainToInstance(EnvModel, merged, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(env, { skipMissingProperties: false });

  if (errors.length > 0) {
    const summary = errors
      .map((error) => Object.values(error.constraints ?? {}).join('; '))
      .join(' | ');
    throw new Error(`Invalid environment configuration: ${summary}`);
  }
  return env;
}
