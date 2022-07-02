import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './utils/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Kaiju')
    .setDescription('The kaiju API description')
    .setVersion('0.1')
    .addTag('kaiju')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);
  // app.useGlobalInterceptors(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
