import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { PageDto } from 'common/dto/page.dto';
import { User } from '@user/entities/user.entity';
import { PageOptionsDto } from 'common/dto/page-options.dto';
import { RoleGuard } from '@auth/guard/role.guard';
import { Role } from '@user/entities/role.enum';

@Controller('user')
@UseGuards(RoleGuard(Role.ADMIN))
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 유저 전체 찾기 API
  @Get('/all')
  async findUser(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {
    return await this.userService.findUser(pageOptionsDto);
  }
}
