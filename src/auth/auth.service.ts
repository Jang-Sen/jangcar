import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { MailService } from '@mail/mail.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { LoginUserDto } from '@user/dto/login-user.dto';
import { TokenPayloadInterface } from '@auth/interface/tokenPayload.interface';
import { Provider } from '@user/entities/provider.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  // 회원가입 로직
  async signup(dto: CreateUserDto) {
    return await this.userService.create({ ...dto, provider: Provider.LOCAL });
  }

  // 로그인 로직
  async login(dto: LoginUserDto) {
    // 메일 체크
    const user = await this.userService.findUserBy('email', dto.email);

    // 암호화 된 비밀번호 체크
    const match = await bcrypt.compare(dto.password, user.password);

    if (!match) {
      throw new HttpException(
        '비밀번호가 일치하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  // 회원가입 후 메일 전송
  async signupMail(email: string) {
    await this.mailService.sendMail({
      to: email,
      subject: '안녕하세요 장카입니다.',
      text: '장카의 회원이 되어주셔서 감사드립니다.',
      html: '<h3>잘 부탁드립니다.</h3>',
    });
  }

  // Access Token 발행 로직
  // public generateAccessToken(userId: string) {
  //   const payload: TokenPayloadInterface = { userId };
  //
  //   return this.jwtService.sign(payload, {
  //     secret: this.configService.get('ACCESS_TOKEN_SECRET'),
  //     expiresIn: this.configService.get('ACCESS_TOKEN_TIME'),
  //   });
  // }

  // Token 발행 로직
  public generateToken(
    tokenType: 'access' | 'refresh',
    userId: string,
  ): {
    token: string;
    cookie: string;
  } {
    const payload: TokenPayloadInterface = { userId };

    const secret = this.configService.get(
      tokenType === 'access' ? 'ACCESS_TOKEN_SECRET' : 'REFRESH_TOKEN_SECRET',
    );
    const expiresIn = this.configService.get(
      tokenType === 'access' ? 'ACCESS_TOKEN_TIME' : 'REFRESH_TOKEN_TIME',
    );

    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });

    const cookieName = tokenType === 'access' ? 'Authentication' : 'Refresh';
    const cookie = `${cookieName}=${token}; Path=/; Max-Age=${expiresIn};`;

    return { token, cookie };
  }
}
