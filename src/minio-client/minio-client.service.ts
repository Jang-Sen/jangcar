import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { ConfigService } from '@nestjs/config';
import { User } from '@user/entities/user.entity';
import { BufferedFile } from '@minio-client/interface/file.model';
import * as crypto from 'crypto';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket: string;

  private get client() {
    return this.minioService.client;
  }

  constructor(
    private readonly configService: ConfigService,
    private readonly minioService: MinioService,
  ) {
    this.logger = new Logger('MinioClientService');
    this.baseBucket = this.configService.get('MINIO_BUCKET');
  }

  // 유저 프로필 사진 업로드
  public async uploadProfileImg(
    user: User,
    file: BufferedFile,
    categoryName: string,
    baseBucket: string = this.baseBucket,
  ): Promise<string> {
    if (
      !(
        file.mimetype.includes('png') ||
        file.mimetype.includes('jpg') ||
        file.mimetype.includes('jpeg')
      )
    ) {
      throw new HttpException(
        '업로드 할 수 있는 파일이 아닙니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const temp_fileName = Date.now().toString();
    const hashFileName = crypto
      .createHash('md5')
      .update(temp_fileName)
      .digest('hex');

    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };

    const fileName = `${hashFileName}${ext}`;
    const fileBuffer = file.buffer;
    const filePath = `${categoryName}/${user.id}/${fileName}`;

    await new Promise<void>((resolve, reject) => {
      this.client.putObject(
        baseBucket,
        filePath,
        fileBuffer,
        fileBuffer.length,
        metaData,
        (error) => {
          if (error) {
            console.log('파일 업로드 실패' + error.message);
          }

          return reject(
            new HttpException('파일 업로드 실패', HttpStatus.BAD_REQUEST),
          );
        },
      );
      resolve();
    });

    return `http://${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}/${this.configService.get('MINIO_BUCKET')}/${filePath}`;
  }
}
