import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HealthCheckModule } from '../src/healthcheck.module';
import { INestApplication } from '@nestjs/common';

describe('HealthCheck (e2e)', () => {
  let app: INestApplication;
  let appNoLabel: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HealthCheckModule.register('MOCK_SERVICE')],
    })
    .compile();
    app = moduleRef.createNestApplication();
    await app.init();

    const moduleRefNoLabel = await Test.createTestingModule({
      imports: [HealthCheckModule.register()],
    })
    .compile();
    appNoLabel = moduleRefNoLabel.createNestApplication();
    await appNoLabel.init();
  });

  it(`/GET health-check (with label)`, () => {
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

  it(`/GET health-check (without label)`, () => {
    return request(appNoLabel.getHttpServer())
      .get('/health-check')
      // Success status
      .expect(200)
      // Returned the expected values
      .expect({
        payload: 'OK'
      });
  });

  afterAll(async () => {
    await app.close();
    await appNoLabel.close();
  });
});