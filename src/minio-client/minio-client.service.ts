import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { ConfigService } from '@nestjs/config';
import { User } from '@user/entities/user.entity';
import { BufferedFile } from '@minio-client/interface/file.model';
import * as crypto from 'crypto';
import { Car } from '@car/entities/car.entity';

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

  // 차 사진 여러개 업로드
  public async uploadCarImgs(
    car: Car,
    files: BufferedFile[],
    categoryName: string,
    baseBucket: string = this.baseBucket,
  ): Promise<string[]> {
    const uploadUrl: string[] = [];

    // 기존 파일 존재 시, 해당 폴더 삭제
    if (`${categoryName}/${car.id}`.includes(car.id)) {
      await this.deleteFolderContent(
        this.baseBucket,
        `${categoryName}/${car.id}/`,
      );
    }

    for (const file of files) {
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
      const filePath = `${categoryName}/${car.id}/${fileName}`;

      // 폴더에 파일 넣기
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
      uploadUrl.push(
        `http://${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}/${this.configService.get('MINIO_BUCKET')}/${filePath}`,
      );
    }
    return uploadUrl;
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

    // 기존 파일 존재 시, 해당 폴더 삭제
    if (`${categoryName}/${user.id}`.includes(user.id)) {
      await this.deleteFolderContent(
        this.baseBucket,
        `${categoryName}/${user.id}/`,
      );
    }

    // 폴더에 파일 넣기
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

  // 파일 서버에 수정한 파일만 남기고 기존 파일 삭제
  async deleteFolderContent(bucketName: string, folderPath: string) {
    const objectList = [];
    const stream = this.client.listObjects(bucketName, folderPath, true);

    // 파일 여러개일 경우 전체 넣기
    for await (const obj of stream) {
      objectList.push(obj.name);
    }

    if (objectList.length > 0) {
      const result = await this.client.removeObjects(bucketName, objectList);

      console.log('삭제 완료: ' + result);
    }

    console.log('삭제할 파일 없음');
  }
}
