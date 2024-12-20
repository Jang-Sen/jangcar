import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RequestUserInterface } from '@auth/interface/requestUser.interface';
import { CreateCommentDto } from '@comment/dto/create-comment.dto';
import { AccessTokenGuard } from '@auth/guard/accessToken.guard';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:carId')
  @ApiParam({
    name: 'carId',
    description: 'Car ID',
  })
  @ApiOperation({
    summary: '댓글 조회',
    description: 'Car ID로 조회',
  })
  async findCommentsByCarId(@Param('carId') carId: string) {
    return await this.commentService.findCommentsByCarId(carId);
  }

  @Post('/:carId')
  @UseGuards(AccessTokenGuard)
  @ApiParam({
    name: 'carId',
    description: 'Car ID',
  })
  @ApiOperation({
    summary: '댓글 생성',
    description: '회원만 이용 가능',
  })
  async createComment(
    @Req() req: RequestUserInterface,
    @Param('carId') carId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return await this.commentService.createComment(req.user, carId, dto);
  }
}
