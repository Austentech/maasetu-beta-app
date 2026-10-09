import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './config/env.service';
import { validateEnv } from './config/env.validation';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    // Environment variables are validated once at startup — the process
    // fails fast instead of running with invalid configuration.
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
    }),
    HealthModule,
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class AppModule {}
