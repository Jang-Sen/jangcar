import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '@comment/entities/comment.entity';
import { Repository } from 'typeorm';
import { CarService } from '@car/car.service';
import { User } from '@user/entities/user.entity';
import { CreateCommentDto } from '@comment/dto/create-comment.dto';
import { UpdateCommentDto } from '@comment/dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
    private readonly carService: CarService,
  ) {}

  // 조회(자동차 ID로 조회)
  async findCommentsByCarId(carId: string) {
    const car = await this.carService.getCarById(carId);

    const comments = await this.repository.find({
      where: {
        car: {
          id: car.id,
        },
      },
      relations: {
        user: true,
        car: true,
      },
    });

    if (!comments) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    return comments;
  }

  // 등록
  async createComment(user: User, carId: string, commentDto: CreateCommentDto) {
    const car = await this.carService.getCarById(carId);

    const comment = this.repository.create({
      user,
      car,
      ...commentDto,
    });

    await this.repository.save(comment);

    return comment;
  }

  // 수정
  async updateCommentOnlySelf(
    user: User,
    commentId: string,
    commentDto: UpdateCommentDto,
  ): Promise<string> {
    const comment = await this.repository.findOne({
      where: {
        id: commentId,
      },
      relations: {
        user: true,
      },
    });

    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    if (comment.user.id !== user.id) {
      throw new ForbiddenException('본인이 작성한 댓글만 수정 가능합니다.');
    }

    Object.assign(comment, commentDto);
    await this.repository.save(comment);

    return '수정 완료';
  }

  // 삭제
  async deleteCommentOnlySelf(user: User, commentId: string): Promise<string> {
    const comment = await this.repository.findOne({
      where: {
        id: commentId,
      },
      relations: {
        user: true,
      },
    });

    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    if (comment.user.id !== user.id) {
      throw new ForbiddenException('본인이 작성한 댓글만 수정 가능합니다.');
    }

    await this.repository.remove(comment);

    return '삭제 완료';
  }
}
