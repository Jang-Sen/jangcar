import {
  Body,
  Controller,
  Get,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '@user/user.service';
import { User } from '@user/entities/user.entity';
import { RoleGuard } from '@auth/guard/role.guard';
import { Role } from '@user/entities/role.enum';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { BufferedFile } from '@minio-client/interface/file.model';
import { RequestUserInterface } from '@auth/interface/requestUser.interface';
import { AccessTokenGuard } from '@auth/guard/accessToken.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '@common/dto/page-options.dto';
import { PageDto } from '@common/dto/page.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 유저 전체 찾기 API
  @Get('/all')
  @UseGuards(RoleGuard(Role.ADMIN))
  async findUser(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {
    return await this.userService.findUser(pageOptionsDto);
  }

  // 유저 프로필 변경
  @Put()
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('img'))
  @ApiBody({
    description: '프로필 이미지 변경',
    schema: {
      type: 'object',
      properties: {
        img: {
          type: 'string',
          format: 'binary',
          description: 'profileImg',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async updateProfile(
    @Req() req: RequestUserInterface,
    @Body() dto?: UpdateUserDto,
    @UploadedFile() img?: BufferedFile,
  ) {
    return await this.userService.updateProfile(req.user, dto, img);
  }
}
