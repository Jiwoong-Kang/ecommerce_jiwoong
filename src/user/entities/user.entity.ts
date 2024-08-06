import { BaseEntity } from '../../common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  // name, email, password,
  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;
}
