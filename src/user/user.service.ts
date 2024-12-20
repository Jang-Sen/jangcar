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
import { MinioClientService } from '@minio-client/minio-client.service';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { BufferedFile } from '@minio-client/interface/file.model';
import { PageOptionsDto } from '@common/dto/page-options.dto';
import { PageMetaDto } from '@common/dto/page-meta.dto';
import { PageDto } from '@common/dto/page.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly minioClientService: MinioClientService,
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
      .leftJoinAndSelect('user.comments', 'comment')
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

  // 토큰을 이용한 프로필 수정(사진 포함)
  async updateProfile(
    user: User,
    dto: UpdateUserDto,
    img?: BufferedFile,
  ): Promise<string> {
    const profileImgUrl = await this.minioClientService.uploadProfileImg(
      user,
      img,
      'profile',
    );
    const result = await this.repository.update(user.id, {
      ...dto,
      profileImg: profileImgUrl,
    });

    if (!result.affected) {
      throw new NotFoundException('회원을 찾을 수 없습니다.');
    }

    return '업데이트 완료';
  }
}
