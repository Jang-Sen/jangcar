import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty({ example: ['image1.png', 'image2.jpg'] })
  carImg?: string[];
}
