import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: '홍길동' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  userName: string;

  @ApiProperty({ example: '123456a!' })
  @IsString()
  @MinLength(7)
  password?: string;

  @ApiProperty({ example: 'email@exam.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 1012345678 })
  @IsNumber()
  phone: number;
}
