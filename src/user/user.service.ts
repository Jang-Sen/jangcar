import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  // 유저 등록
  async create(dto: CreateUserDto) {
    const user = await this.repository.create(dto);
    await this.repository.save(user);

    return user;
  }

  // id or email로 유저 정보 찾기
  async findUserBy(key: 'id' | 'email', value: string) {
    const user = await this.repository.findOneBy({ [key]: value });

    if (user) {
      return user;
    }

    throw new NotFoundException('찾을 수 없는 회원입니다.');
  }
}
