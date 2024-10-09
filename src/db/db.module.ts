import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (service: ConfigService) => ({
        type: 'postgres',
        host: service.get('POSTGRES_HOST'),
        port: service.get('POSTGRES_PORT'),
        username: service.get('POSTGRES_USER'),
        password: service.get('POSTGRES_PASSWORD'),
        database: service.get('POSTGRES_DB'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DbModule {}
