import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@root/app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // port
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get('BACKEND_PORT');

  app.setGlobalPrefix('api'); // url 에 api 추가
  app.use(cookieParser()); // cookie

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Jangcar API')
    .setDescription('Jangcar API Description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Jangcar')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-swagger', app, document);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(port);
}

bootstrap();
