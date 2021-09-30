import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheckModule } from './modules/healthcheck/healthcheck.module';

import { AppService } from './app.service';

@Module({
  imports: [HealthCheckModule.register('TEST SERVICE')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
