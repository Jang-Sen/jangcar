import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PageOptionsDto {
  @IsOptional()
  @ApiPropertyOptional({ description: '현재 페이지', default: 1 })
  readonly page?: number = 1;

  @IsOptional()
  @ApiPropertyOptional({
    description: '현제 페이지에 보여지는 데이터 수',
    default: 10,
  })
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
