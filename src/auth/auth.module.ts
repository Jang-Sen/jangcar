import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { LocalAuthStrategy } from '@auth/strategy/local-auth.strategy';
import { AccessTokenStrategy } from '@auth/strategy/accessToken.strategy';
import { MailModule } from '@mail/mail.module';
import { GoogleAuthStrategy } from '@auth/strategy/google-auth.strategy';
import { KakaoAuthStrategy } from '@auth/strategy/kakao-auth.strategy';
import { NaverAuthStrategy } from '@auth/strategy/naver-auth.strategy';

@Module({
  imports: [ConfigModule, UserModule, MailModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthStrategy,
    AccessTokenStrategy,
    GoogleAuthStrategy,
    KakaoAuthStrategy,
    NaverAuthStrategy,
  ],
})
export class AuthModule {}
