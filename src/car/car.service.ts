import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '@car/entities/car.entity';
import { CreateCarDto } from '@car/dto/create-car.dto';
import { UpdateCarDto } from '@car/dto/update-car.dto';
import { PageDto } from 'common/dto/page.dto';
import { PageOptionsDto } from 'common/dto/page-options.dto';
import { PageMetaDto } from 'common/dto/page-meta.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private repository: Repository<Car>,
  ) {}

  // 전체 찾기 로직
  async getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Car>> {
    // return await this.repository.find();
    const queryBuilder = this.repository.createQueryBuilder('car');

    queryBuilder
      .orderBy('car.createAt', 'ASC')
      .take(pageOptionsDto.take)
      .skip(pageOptionsDto.skip);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    return new PageDto(entities, pageMetaDto);
  }

  // 상세 찾기 로직
  async getCarById(id: string) {
    const car = await this.repository.findOneBy({ id });

    if (!car) {
      throw new NotFoundException('해당 차를 찾을 수 없습니다.');
    }

    return car;
  }

  // 등록 로직
  async create(dto: CreateCarDto) {
    const car = await this.repository.create(dto);
    await this.repository.save(car);

    return car;
  }

  // 수정 로직
  async update(id: string, dto: UpdateCarDto) {
    const car = await this.repository.update(id, dto);

    if (!car) {
      throw new NotFoundException('해당 차를 찾을 수 없습니다.');
    }

    return car;
  }

  // 삭제 로직
  async delete(id: string) {
    const car = await this.repository.delete(id);

    if (!car) {
      throw new NotFoundException('해당 차를 찾을 수 없습니다.');
    }
  }
}
