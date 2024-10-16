import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CarService } from '@car/car.service';
import { CreateCarDto } from '@car/dto/create-car.dto';
import { UpdateCarDto } from '@car/dto/update-car.dto';

@ApiTags('car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  // 전체 찾기 API
  @Get('/all')
  async getAll() {
    return await this.carService.getAll();
  }

  // 상세 찾기 API
  @Get('/:id')
  async getCarById(@Param('id') id: string) {
    return await this.carService.getCarById(id);
  }

  // 등록 API
  @Post('/create')
  @ApiBody({ type: CreateCarDto })
  async create(@Body() dto: CreateCarDto) {
    return await this.carService.create(dto);
  }

  // 수정 API
  @Put('/:id')
  @ApiBody({ type: CreateCarDto })
  async update(@Param('id') id: string, @Body() dto: UpdateCarDto) {
    return await this.carService.update(id, dto);
  }

  // 삭제 API
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.carService.delete(id);
  }
}
