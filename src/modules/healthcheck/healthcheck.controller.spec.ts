import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './healthcheck.controller';

describe('HealthCheckController', () => {
  let healthCheckController: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [{
          provide: 'SERVICE_NAME',
          useValue: 'MOCK_SERVICE'
      }],
    }).compile();

    healthCheckController = app.get<HealthCheckController>(HealthCheckController);
  });

  describe('healthCheck', () => {
    it('should return OK payload and use the MOCK_SERVICE service name', () => {
        let response = healthCheckController.healthCheck()
        expect(response.payload).toBe('OK');
        expect(response.service).toBe('MOCK_SERVICE')
    });
  });
});
