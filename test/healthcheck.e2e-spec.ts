import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HealthCheckModule } from '../src/modules/healthcheck/healthcheck.module';
import { INestApplication } from '@nestjs/common';

describe('HealthCheck (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HealthCheckModule.register('MOCK_SERVICE')],
    })
    .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET health-check`, () => {
    return request(app.getHttpServer())
      .get('/health-check')
      // Success status
      .expect(200)
      // Returned the expected values
      .expect({
        payload: 'OK',
        service: 'MOCK_SERVICE'
      });
  });

  afterAll(async () => {
    await app.close();
  });
});