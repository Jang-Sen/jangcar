import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@user/entities/user.entity';
import { CreateUserDto } from '@user/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  // 유저 등록
  async create(dto: CreateUserDto) {
    const user = this.repository.create(dto);
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
