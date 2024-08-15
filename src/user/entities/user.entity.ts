import { BaseEntity } from '../../common/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';
import { InternalServerErrorException } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { Provider } from '../../common/enums/provider.enum';

@Entity()
export class User extends BaseEntity {
  // name, email, password,
  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  @Exclude()
  public password?: string;
  //소셜로그인 시 패스워드 안 넣어도 되게 하기 위해서

  @Column()
  public profileImg?: string;
  // ?는 있어도 그만 없어도 그만이라는 뜻이다. optional

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.LOCAL,
  })
  public provider: Provider;

  @BeforeInsert()
  async beforeSaveFunction() {
    try {
      if (this.provider !== Provider.LOCAL) {
        return;
      } else {
        // password 암호화
        const saltValue = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, saltValue);

        //profile 이미지 자동생성
        this.profileImg = gravatar.url(this.email, {
          s: '200',
          r: 'pg',
          d: 'mm',
          protocol: 'https',
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
