import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as gravatar from 'gravatar';
import { Exclude } from 'class-transformer';
import { Base } from '@car/entities/base.entity';

@Entity()
export class User extends Base {
  @Column()
  public userName: string;

  @Column()
  @Exclude()
  public password?: string;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  public phone?: number;

  @Column({ nullable: true })
  public profileImg?: string;

  @BeforeInsert()
  async beforeSave() {
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
}
