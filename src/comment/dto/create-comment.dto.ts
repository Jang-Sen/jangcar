import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsString()
  @ApiProperty({
    description: '댓글 내용',
    example: '관리가 정말 잘 되어있는거 같아요. 잘썼습니다.',
  })
  contents: string;
}
