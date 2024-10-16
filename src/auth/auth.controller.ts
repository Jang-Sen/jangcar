import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@auth/auth.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { LocalAuthGuard } from '@auth/guard/local-auth.guard';
import { RequestUserInterface } from '@auth/interface/requestUser.interface';
import { AccessTokenGuard } from '@auth/guard/accessToken.guard';
import { LoginUserDto } from '@user/dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  async login(@Req() req: RequestUserInterface) {
    const user = req.user;
    // 로그인 시 토큰 발행
    const token = this.authService.generateAccessToken(user.id);

    return { user, token };
  }

  // 로그인 이후, 토큰으로 유저 정보 찾는 API
  @Get()
  @UseGuards(AccessTokenGuard)
  async authenticate(@Req() req: RequestUserInterface) {
    return req.user;
  }
}
