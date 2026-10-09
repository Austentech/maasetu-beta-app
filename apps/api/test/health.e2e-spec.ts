import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/bootstrap';

/**
 * End-to-end tests run against an app configured exactly like production
 * (via the shared `configureApp`), including versioning, validation,
 * the response envelope and the error filter.
 */
describe('MaaSetu API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/v1/health', () => {
    it('returns the success envelope with health data', () => {
      return request(app.getHttpServer())
        .get('/api/v1/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.status).toBe('ok');
          expect(res.body.data.service).toBe('maasetu-api');
          expect(typeof res.body.data.version).toBe('string');
          expect(typeof res.body.data.timestamp).toBe('string');
        });
    });

    it('sets standard hardening headers', () => {
      return request(app.getHttpServer())
        .get('/api/v1/health')
        .expect(200)
        .expect((res) => {
          expect(res.headers['x-content-type-options']).toBe('nosniff');
          expect(res.headers['x-frame-options']).toBeDefined();
        });
    });
  });

  describe('unknown routes', () => {
    it('returns the error envelope with a NOT_FOUND code', () => {
      return request(app.getHttpServer())
        .get('/api/v1/does-not-exist')
        .expect(404)
        .expect((res) => {
          expect(res.body.success).toBe(false);
          expect(res.body.error.code).toBe('NOT_FOUND');
          expect(typeof res.body.error.message).toBe('string');
        });
    });
  });
});
