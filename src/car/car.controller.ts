import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CarService } from '@car/car.service';
import { CreateCarDto } from '@car/dto/create-car.dto';
import { UpdateCarDto } from '@car/dto/update-car.dto';
import { RoleGuard } from '@auth/guard/role.guard';
import { Role } from '@user/entities/role.enum';
import { ObjectIdDto } from '@root/common/dto/object-id.dto';
import { PageDto } from 'common/dto/page.dto';
import { Car } from '@car/entities/car.entity';
import { PageOptionsDto } from 'common/dto/page-options.dto';
import { BufferedFile } from '@minio-client/interface/file.model';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  // 전체 찾기 API
  @Get('/all')
  async getAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Car>> {
    return await this.carService.getAll(pageOptionsDto);
  }

  // 상세 찾기 API
  @Get('/:id')
  async getCarById(@Param() { id }: ObjectIdDto) {
    return await this.carService.getCarById(id);
  }

  // 등록 API
  @Post('/create')
  @UseGuards(RoleGuard(Role.ADMIN))
  @ApiBody({ type: CreateCarDto })
  async create(@Body() dto: CreateCarDto) {
    return await this.carService.create(dto);
  }

  // 수정 API
  @Put('/:id')
  // @UseGuards(RoleGuard(Role.ADMIN))
  @UseInterceptors(FilesInterceptor('imgs'))
  @ApiBody({ type: CreateCarDto })
  @ApiBody({
    description: '차 이미지 변경',
    schema: {
      type: 'object',
      properties: {
        imgs: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
            description: 'carImgs',
          },
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param() { id }: ObjectIdDto,
    @Body() dto?: UpdateCarDto,
    @UploadedFiles() imgs?: BufferedFile[],
  ) {
    return await this.carService.update(id, dto, imgs);
  }

  // 삭제 API
  @Delete('/:id')
  @UseGuards(RoleGuard(Role.ADMIN))
  async delete(@Param() { id }: ObjectIdDto) {
    return await this.carService.delete(id);
  }
}
