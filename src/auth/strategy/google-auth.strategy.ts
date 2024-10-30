import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { Provider } from '@user/entities/provider.enum';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@user/user.service';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(
  Strategy,
  Provider.GOOGLE,
) {
  constructor(
    private readonly config: ConfigService,
    private readonly user: UserService,
  ) {
    super({
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: config.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { provider, displayName, email, picture } = profile;

    try {
      const user = await this.user.findUserBy('email', email);

      if (user.provider !== provider) {
        throw new HttpException(
          `이미 ${user.provider}에 가입되어 있습니다.`,
          HttpStatus.CONFLICT,
        );
      }

      console.log('+++++++');
      done(null, user);
    } catch (e) {
      if (e.status === 404) {
        const newUser = await this.user.create({
          email,
          profileImg: picture,
          provider,
          userName: displayName,
        });

        console.log('--------');
        done(null, newUser);
      }
    }
  }
}
