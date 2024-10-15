import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarController } from '@car/car.controller';
import { CarService } from '@car/car.service';
import { Car } from '@car/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
