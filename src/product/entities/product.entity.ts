import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@common/base.entity';
import { Category } from '@common/enums/category.enum';

@Entity()
export class Product extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column({ nullable: true })
  public productImg?: string;

  @Column()
  public price: number;

  @Column()
  public stock: number;

  @Column({ default: true })
  public isSale: boolean;

  @Column({
    type: 'enum',
    enum: Category,
    default: Category.CLOTHES,
  })
  public category: Category;
}
