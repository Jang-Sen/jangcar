import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';
import { Exclude } from 'class-transformer';
import { Base } from '@root/common/entities/base.entity';
import { Provider } from '@user/entities/provider.enum';
import { Term } from '@root/term/entities/term.entity';
import { Role } from '@user/entities/role.enum';
import { Comment } from '@comment/entities/comment.entity';

@Entity()
export class User extends Base {
  @Column()
  public userName: string;

  @Column({ nullable: true })
  @Exclude()
  public password?: string;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  public phone?: number;

  @Column({ nullable: true })
  public profileImg?: string;

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.LOCAL,
  })
  public provider: Provider;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.USER],
  })
  @Exclude()
  public roles: Role[];

  @OneToOne(() => Term, { cascade: true, eager: true })
  @JoinColumn()
  public term: Term;

  @OneToMany(() => Comment, (comment) => comment.user)
  public comments: Comment[];

  @BeforeInsert()
  async beforeSave() {
    try {
      if (this.provider !== Provider.LOCAL) {
        // 소셜 로그인 시, 반환
        return;
      } else {
        // 비밀번호 암호화
        const saltValue = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, saltValue);

        // 프로필 자동생성
        this.profileImg = gravatar.url(this.email, {
          s: '200',
          r: 'pg',
          d: 'mm',
          protocol: 'https',
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
}
