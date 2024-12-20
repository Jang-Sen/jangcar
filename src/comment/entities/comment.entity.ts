import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '@common/entities/base.entity';
import { User } from '@user/entities/user.entity';
import { Car } from '@car/entities/car.entity';

@Entity()
export class Comment extends Base {
  @ManyToOne(() => User, (user) => user.comments)
  public user: User;

  @ManyToOne(() => Car, (car) => car.comments)
  public car: Car;

  @Column()
  public contents: string;
}
