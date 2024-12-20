import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '@root/common/entities/base.entity';
import { Comment } from '@comment/entities/comment.entity';

@Entity()
export class Car extends Base {
  @Column()
  public carName: string;

  @Column()
  public price: number;

  @Column()
  public category: string;

  @Column({ type: 'simple-array', nullable: true })
  public carImg?: string[];

  @OneToMany(() => Comment, (comment) => comment.car)
  public comments: Comment[];
}
