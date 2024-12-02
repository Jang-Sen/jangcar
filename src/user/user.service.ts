import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@user/entities/user.entity';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PageDto } from 'common/dto/page.dto';
import { PageOptionsDto } from 'common/dto/page-options.dto';
import { PageMetaDto } from 'common/dto/page-meta.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  // 유저 등록
  async create(dto: CreateUserDto) {
    const user = this.repository.create(dto);
    await this.repository.save(user);

    return user;
  }

  // 유저 전체 찾기
  async findUser(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const queryBuilder = this.repository.createQueryBuilder('user');

    if (pageOptionsDto.keyword) {
      queryBuilder.andWhere('user.userName = :userName', {
        userName: pageOptionsDto.keyword,
      });
    }

    queryBuilder
      .leftJoinAndSelect('user.term', 'term')
      .orderBy('user.createAt', pageOptionsDto.order)
      .take(pageOptionsDto.take)
      .skip(pageOptionsDto.skip);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    return new PageDto(entities, pageMetaDto);
  }

  // id or email로 유저 정보 찾기
  async findUserBy(key: 'id' | 'email', value: string) {
    const user = await this.repository.findOneBy({ [key]: value });

    if (user) {
      return user;
    }

    throw new NotFoundException('찾을 수 없는 회원입니다.');
  }

  // redis에 refresh token 담기
  async refreshTokenSaveRedis(userId: string, refreshToken: string) {
    const genSalt = await bcrypt.genSalt(10);
    const hashRefreshToken = await bcrypt.hash(refreshToken, genSalt);

    await this.cacheManager.set(userId, hashRefreshToken);
  }

  // refresh token 검증
  async matchRefreshToken(userId: string, refreshToken: string) {
    const user = await this.findUserBy('id', userId);
    const redisUserId: string = await this.cacheManager.get(user.id);

    const match = await bcrypt.compare(refreshToken, redisUserId);

    if (match) {
      return user;
    }
  }
}
