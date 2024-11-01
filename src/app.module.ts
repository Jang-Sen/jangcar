import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { DbModule } from '@db/db.module';
import { CarModule } from '@car/car.module';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { MailModule } from '@mail/mail.module';
import { RedisModule } from './redis/redis.module';
import { TermModule } from './term/term.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        MAIL_SERVICE: Joi.string().required(),
        MAIL_USER: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_TIME: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PASSWORD: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        REDIS_TTL: Joi.number().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_CALLBACK_URL: Joi.string().required(),
        KAKAO_CLIENT_ID: Joi.string().required(),
        KAKAO_CALLBACK_URL: Joi.string().required(),
        NAVER_CLIENT_ID: Joi.string().required(),
        NAVER_CLIENT_SECRET: Joi.string().required(),
        NAVER_CALLBACK_URL: Joi.string().required(),
      }),
    }),
    DbModule,
    CarModule,
    UserModule,
    AuthModule,
    MailModule,
    RedisModule,
    TermModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
