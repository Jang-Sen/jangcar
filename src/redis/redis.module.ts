import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common/cache';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          store: redisStore,
          host: configService.get('REDIS_HOST'),
          password: configService.get('REDIS_PASSWORD'),
          port: configService.get('REDIS_PORT'),
          ttl: configService.get('REDIS_TTL'),
        };
      },
    }),
  ],
})
export class RedisModule {}
