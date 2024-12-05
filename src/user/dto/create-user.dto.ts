import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Provider } from '@user/entities/provider.enum';
import { Term } from '@root/term/entities/term.entity';
import { CreateTermDto } from '@root/term/dto/create-term.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ example: '홍길동' })
  userName: string;

  @IsString()
  @IsOptional()
  @MinLength(7)
  @ApiProperty({ example: '123456a!' })
  password?: string;

  @IsEmail()
  @ApiProperty({ example: 'email@exam.com' })
  email: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1012345678 })
  phone?: number;

  @IsString()
  @IsOptional()
  provider?: Provider;

  @IsString()
  @IsOptional()
  profileImg?: string;

  @IsOptional()
  @ApiProperty({ type: CreateTermDto })
  term?: Term;
}
