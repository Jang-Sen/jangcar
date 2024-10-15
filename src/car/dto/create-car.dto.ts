import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ example: 'K7' })
  @IsString()
  carName: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: '하이브리드' })
  @IsString()
  category: string;

  @ApiProperty()
  @IsString()
  carImg: string;
}
