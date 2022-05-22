import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogService } from './utils/logger/log.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.enableCors();
  app.useLogger(new LogService());
  await app.listen(3000);
}
bootstrap();
