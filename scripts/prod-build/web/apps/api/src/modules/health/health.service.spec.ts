import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { API_VERSION } from '../../version';
import { HealthService } from './health.service';

// Read package.json at runtime (a static JSON import would change the
// compiler's rootDir and shift the build output layout).
const pkg = JSON.parse(
  readFileSync(join(__dirname, '../../../package.json'), 'utf8'),
) as { version: string };

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(() => {
    service = new HealthService();
  });

  it('reports an ok status with the service identity', () => {
    const result = service.check();
    expect(result.status).toBe('ok');
    expect(result.service).toBe('maasetu-api');
  });

  it('reports a valid ISO-8601 timestamp', () => {
    const { timestamp } = service.check();
    expect(new Date(timestamp).toISOString()).toBe(timestamp);
  });

  it('reports the API version', () => {
    const { version } = service.check();
    expect(version).toBe(API_VERSION);
  });

  it('keeps the source version constant in sync with package.json', () => {
    // Guards against drift when the package version is bumped.
    expect(API_VERSION).toBe(pkg.version);
  });
});
