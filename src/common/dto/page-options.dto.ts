import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from '@common/constant/order.constant';
import { Sort } from '@common/constant/sort.constant';

export class PageOptionsDto {
  @IsOptional()
  @ApiPropertyOptional({ description: '검색어' })
  readonly keyword?: string;

  @IsOptional()
  @IsEnum(Order)
  @ApiPropertyOptional({
    description: '정렬 순서(기본 오름차순)',
    enum: Order,
    default: Order.ASC,
  })
  readonly order?: Order = Order.ASC;

  @IsOptional()
  @IsEnum(Sort)
  @ApiPropertyOptional({
    description: '정렬 기준(기본 생성 날짜)',
    enum: Sort,
    default: Sort.CREATE_AT,
  })
  readonly sort?: Sort = Sort.CREATE_AT;

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
