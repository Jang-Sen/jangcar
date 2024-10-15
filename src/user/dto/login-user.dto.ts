import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'email@exam.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456a!' })
  @IsString()
  @MinLength(7)
  password: string;
}
