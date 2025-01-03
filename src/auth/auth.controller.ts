import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@auth/auth.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { LocalAuthGuard } from '@auth/guard/local-auth.guard';
import { RequestUserInterface } from '@auth/interface/requestUser.interface';
import { AccessTokenGuard } from '@auth/guard/accessToken.guard';
import { LoginUserDto } from '@user/dto/login-user.dto';
import { GoogleAuthGuard } from '@auth/guard/google-auth.guard';
import { KakaoAuthGuard } from '@auth/guard/kakao-auth.guard';
import { NaverAuthGuard } from '@auth/guard/naver-auth.guard';
import { RefreshTokenGuard } from '@auth/guard/refreshToken.guard';
import { UserService } from '@user/user.service';
import { Response } from 'express';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('auth')
@UseGuards(ThrottlerGuard)
@Controller({ path: 'auth', version: '2' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // 회원가입 API
  @Post('/signup')
  @ApiBody({ type: CreateUserDto })
  async signup(@Body() dto: CreateUserDto) {
    const user = await this.authService.signup(dto);
    await this.authService.signupMail(user.email);

    return user;
  }

  // 로그인 API
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  async login(@Req() req: RequestUserInterface, @Res() res: Response) {
    const user = req.user;
    // 로그인 시 토큰 발행
    const { cookie: accessCookie } = this.authService.generateToken(
      'access',
      user.id,
    );
    const { token: refreshToken, cookie: refreshCookie } =
      this.authService.generateToken('refresh', user.id);

    await this.userService.refreshTokenSaveRedis(user.id, refreshToken);

    res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);

    res.send({ user });
  }

  // access token 갱신 API
  @Get('/refresh')
  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  async refresh(@Req() req: RequestUserInterface, @Res() res: Response) {
    const user = req.user;

    const { cookie: accessCookie } = this.authService.generateToken(
      'access',
      user.id,
    );

    res.setHeader('Set-Cookie', [accessCookie]);

    res.send({ user });
  }

  // 로그인 이후, 토큰으로 유저 정보 찾는 API
  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async authenticate(@Req() req: RequestUserInterface) {
    return req.user;
  }

  // 구글 로그인 API
  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    return HttpStatus.OK;
  }

  // 구글 로그인 콜백 API
  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: RequestUserInterface, @Res() res: Response) {
    const user = req.user;
    const { cookie: accessCookie } = this.authService.generateToken(
      'access',
      user.id,
    );
    const { token: refreshToken, cookie: refreshCookie } =
      this.authService.generateToken('refresh', user.id);

    await this.userService.refreshTokenSaveRedis(user.id, refreshToken);

    res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);

    res.send({ user });
  }

  // 카카오 로그인 API
  @Get('/kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin() {
    return HttpStatus.OK;
  }

  // 카카오 로그인 콜백 API
  @Get('/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoCallback(@Req() req: RequestUserInterface, @Res() res: Response) {
    const user = req.user;
    const { cookie: accessCookie } = this.authService.generateToken(
      'access',
      user.id,
    );
    const { token: refreshToken, cookie: refreshCookie } =
      this.authService.generateToken('refresh', user.id);

    await this.userService.refreshTokenSaveRedis(user.id, refreshToken);

    res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);

    res.send({ user });
  }

  // 네이버 로그인 API
  @Get('/naver')
  @UseGuards(NaverAuthGuard)
  async naverLogin() {
    return HttpStatus.OK;
  }

  // 네이버 로그인 콜백 API
  @Get('/naver/callback')
  @UseGuards(NaverAuthGuard)
  async naverCallback(@Req() req: RequestUserInterface, @Res() res: Response) {
    const user = req.user;
    const { cookie: accessCookie } = this.authService.generateToken(
      'access',
      user.id,
    );
    const { token: refreshToken, cookie: refreshCookie } =
      this.authService.generateToken('refresh', user.id);

    await this.userService.refreshTokenSaveRedis(user.id, refreshToken);

    res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);

    res.send({ user });
  }
}
