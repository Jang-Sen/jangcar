import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';
import { Exclude } from 'class-transformer';
import { Base } from '@car/entities/base.entity';
import { Provider } from '@user/entities/provider.enum';
import { Term } from '@root/term/entities/term.entity';

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

  @OneToOne(() => Term, { cascade: true, eager: true })
  @JoinColumn()
  public term: Term;

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
