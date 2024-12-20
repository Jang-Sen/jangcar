import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '@comment/entities/comment.entity';
import { CarModule } from '@car/car.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CarModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
