import { Injectable, Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@user/user.service';
import { RequestUserInterface } from '@auth/interface/requestUser.interface';
import { TokenPayloadInterface } from '@auth/interface/tokenPayload.interface';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.Refresh;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(
    @Req() req: RequestUserInterface,
    payload: TokenPayloadInterface,
  ) {
    const refreshToken = req?.cookies?.Refresh;

    return await this.userService.matchRefreshToken(
      payload.userId,
      refreshToken,
    );
  }
}
