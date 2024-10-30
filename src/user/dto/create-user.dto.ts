import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Provider } from '@user/entities/provider.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ example: '홍길동' })
  userName: string;

  @IsString()
  @MinLength(7)
  @ApiProperty({ example: '123456a!' })
  password?: string;

  @IsEmail()
  @ApiProperty({ example: 'email@exam.com' })
  email: string;

  @IsNumber()
  @ApiProperty({ example: 1012345678 })
  phone?: number;

  @IsString()
  provider?: Provider;

  @IsString()
  profileImg?: string;
}
