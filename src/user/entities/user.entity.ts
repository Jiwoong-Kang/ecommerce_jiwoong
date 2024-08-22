import { BeforeInsert, Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';
import { InternalServerErrorException } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '@common/base.entity';
import { Provider } from '@common/enums/provider.enum';
import { Role } from '@common/enums/role.enum';
import { Consent } from '@consent/entities/consent.entity';
import { Profile } from '@profile/entities/profile.entity';

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

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.USER],
    //동시에 할 수 있을 때는 array를 사용해준다. user이자 admin이 될 수 있기 때문이다.
  })
  @Exclude()
  public roles: Role[];

  @OneToOne(() => Consent, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public consent: Consent;

  @OneToOne(() => Profile, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public profile: Profile;

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
