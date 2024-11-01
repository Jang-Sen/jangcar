import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TermService } from './term.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '@auth/guard/accessToken.guard';
import { RequestUserInterface } from '@auth/interface/requestUser.interface';
import { CreateTermDto } from '@root/term/dto/create-term.dto';
import { UpdateTermDto } from '@root/term/dto/update-term.dto';

@ApiTags('Term')
@ApiBearerAuth()
@Controller('term')
export class TermController {
  constructor(private readonly termService: TermService) {}

  // 생성 API
  @Post()
  @UseGuards(AccessTokenGuard)
  async create(@Req() req: RequestUserInterface, @Body() dto: CreateTermDto) {
    return await this.termService.create(req.user, dto);
  }

  // 수정 API
  @Put()
  @UseGuards(AccessTokenGuard)
  async update(@Req() req: RequestUserInterface, @Body() dto: UpdateTermDto) {
    return await this.termService.update(req.user, dto);
  }
}
