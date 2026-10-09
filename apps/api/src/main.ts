import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from './bootstrap';
import { EnvService } from './config/env.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  configureApp(app);
  app.enableShutdownHooks();

  const env = app.get(EnvService);
  await app.listen(env.port);

  const logger = new Logger('Bootstrap');
  logger.log(`MaaSetu API listening on :${env.port} (NODE_ENV=${env.nodeEnv})`);
}

void bootstrap();
