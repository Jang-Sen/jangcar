import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { AppModule } from '@root/app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from '@common/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // port
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get('BACKEND_PORT');

  // app.setGlobalPrefix('api'); // url 에 api 추가
  app.use(cookieParser()); // cookie
  app.enableCors(); // 허용된 ip 만 접속 가능하도록 설정

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Jangcar API')
    .setDescription('Jangcar API Description')
    .setVersion('1.0')
    .addServer('/api')
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

  // Response Interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(port);
}

bootstrap();
