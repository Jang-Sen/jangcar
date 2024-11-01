import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@user/entities/user.entity';

@Entity()
export class Term {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ default: false })
  public agreeOfTerm: boolean;

  @Column({ default: false })
  public agreeFourteen: boolean;

  @Column({ default: false })
  public agreeOfService: boolean;

  @Column({ default: false })
  public agreeOfEvent?: boolean;

  @Column({ default: false })
  public agreeOfLocation?: boolean;

  @OneToOne(() => User, (user) => user.term, { onDelete: 'CASCADE' })
  public user: User;
}
