import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './healthcheck.controller';

describe('HealthCheckController', () => {
  let healthCheckController: HealthCheckController;
  let healthCheckControllerNoLabel: HealthCheckController;

  beforeAll(async () => {
    // Module with label provided
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [{
          provide: 'SERVICE_NAME',
          useValue: 'MOCK_SERVICE'
      }],
    }).compile();
    healthCheckController = app.get<HealthCheckController>(HealthCheckController);

    // Module with no label provided
    const appNoLabel: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [{
          provide: 'SERVICE_NAME',
          useValue: null
      }],
    }).compile();
    healthCheckControllerNoLabel = appNoLabel.get<HealthCheckController>(HealthCheckController);
  });

  describe('healthCheck', () => {
    it('should return OK payload and use the MOCK_SERVICE service label when label provided', () => {
        let response = healthCheckController.healthCheck()
        expect(response.payload).toBe('OK');
        expect(response.service).toBe('MOCK_SERVICE')
    });
    it('should return OK payload and omit the service label when label not provided', () => {
      let response = healthCheckControllerNoLabel.healthCheck()
      expect(response.payload).toBe('OK');
      expect(response.service).not.toBeDefined()
    });
  });
});
