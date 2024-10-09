import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Car extends Base {
  @Column()
  public carName: string;

  @Column()
  public price: number;

  @Column()
  public category: string;

  @Column()
  public carImg: string;
}
