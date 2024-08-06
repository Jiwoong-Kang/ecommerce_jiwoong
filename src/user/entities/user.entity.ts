import { BaseEntity } from '../../common/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';
import { InternalServerErrorException } from '@nestjs/common';

@Entity()
export class User extends BaseEntity {
  // name, email, password,
  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public profileImg?: string;
  // ?는 있어도 그만 없어도 그만이라는 뜻이다. optional
  @BeforeInsert()
  async beforeSaveFunction() {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
