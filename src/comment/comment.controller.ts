import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RequestUserInterface } from '@auth/interface/requestUser.interface';
import { CreateCommentDto } from '@comment/dto/create-comment.dto';
import { AccessTokenGuard } from '@auth/guard/accessToken.guard';
import { UpdateCommentDto } from '@comment/dto/update-comment.dto';

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

  @Put('/:commentId')
  @UseGuards(AccessTokenGuard)
  @ApiParam({
    name: 'commentId',
    description: 'Comment ID',
  })
  @ApiOperation({
    summary: '댓글 수정',
    description: '작성자 본인만 수정 가능',
  })
  async updateCommentOnlySelf(
    @Req() req: RequestUserInterface,
    @Param('commentId') commentId: string,
    @Body() dto: UpdateCommentDto,
  ) {
    return await this.commentService.updateCommentOnlySelf(
      req.user,
      commentId,
      dto,
    );
  }

  @Delete('/:commentId')
  @UseGuards(AccessTokenGuard)
  @ApiParam({
    name: 'commentId',
    description: 'Comment ID',
  })
  @ApiOperation({
    summary: '댓글 삭제',
    description: '작성자 본인만 삭제 가능',
  })
  async deleteCommentOnlySelf(
    @Req() req: RequestUserInterface,
    @Param('commentId') commentId: string,
  ) {
    return await this.commentService.deleteCommentOnlySelf(req.user, commentId);
  }
}
