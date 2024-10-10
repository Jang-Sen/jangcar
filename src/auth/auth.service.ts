import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // 회원가입 로직
  async signup(dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    user.password = undefined;

    return user;
  }

  // 로그인 로직
  async login(dto: LoginUserDto) {
    await this.userService.findUserBy('email', dto.email);
  }
}
