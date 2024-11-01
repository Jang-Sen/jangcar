import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'email@exam.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456a!' })
  password: string;
}
