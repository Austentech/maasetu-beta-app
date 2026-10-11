import { Injectable } from '@nestjs/common';
import type { HealthData } from '@maasetu/shared';
import { API_VERSION } from '../../version';

export const SERVICE_NAME = 'maasetu-api';

/**
 * Liveness information for the API process.
 *
 * Deliberately minimal: no database, dependency, or infrastructure
 * diagnostics are exposed through this public endpoint.
 */
@Injectable()
export class HealthService {
  check(): HealthData {
    return {
      status: 'ok',
      service: SERVICE_NAME,
      version: API_VERSION,
      timestamp: new Date().toISOString(),
    };
  }
}
