import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '@auth/auth.service';
import { Provider } from '@user/entities/provider.enum';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(
  Strategy,
  Provider.LOCAL,
) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  // 로그인 관련 검증 함수
  async validate(email: string, password: string) {
    return await this.authService.login({ email, password });
  }
}
