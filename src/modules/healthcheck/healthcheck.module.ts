import { DynamicModule, Module } from '@nestjs/common';
import { HealthCheckController } from './healthcheck.controller'

@Module({})
export class HealthCheckModule {
    static register(
        _serviceName: string
    ): DynamicModule {
        return {
            module: HealthCheckModule,
            controllers: [HealthCheckController],
            providers: [
                {
                    provide: 'SERVICE_NAME',
                    useValue: _serviceName
                }
            ],
        }
    }
}
