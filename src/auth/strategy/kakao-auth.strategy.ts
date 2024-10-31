import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { Provider } from '@user/entities/provider.enum';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@user/user.service';

@Injectable()
export class KakaoAuthStrategy extends PassportStrategy(
  Strategy,
  Provider.KAKAO,
) {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: config.get('KAKAO_CLIENT_ID'),
      callbackURL: config.get('KAKAO_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const { provider, username } = profile;
    const { profile_image } = profile._json.properties;
    const { email } = profile._json.kakao_account;

    try {
      const user = await this.userService.findUserBy('email', email);

      if (user.provider !== provider) {
        throw new HttpException(
          `이미 ${user.provider}에 등록되어 있습니다.`,
          HttpStatus.CONFLICT,
        );
      }

      console.log('=========');
      done(null, user);
    } catch (e) {
      if (e.status === 404) {
        const newUser = await this.userService.create({
          userName: username,
          provider,
          email,
          profileImg: profile_image,
        });

        done(null, newUser);
      }
    }
  }
}
