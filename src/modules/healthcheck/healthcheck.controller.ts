import { Controller, Get, Inject } from '@nestjs/common';
import { HealthCheckResponse } from './healthcheck-response.interface';

@Controller('health-check')
export class HealthCheckController {

    constructor( @Inject('SERVICE_NAME') private readonly SERVICE_NAME: string = 'N/A') {}

	@Get()
    healthCheck(): HealthCheckResponse {
        return {
            payload: 'OK',
            service: this.SERVICE_NAME
        }
    }
}
