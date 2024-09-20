import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@common/enums/category.enum';

export class CreateProductDto {
  @ApiProperty({ example: 'washing machine' })
  name: string;

  @ApiProperty({ example: 'good' })
  description: string;

  @ApiProperty({ example: 'imageExample' })
  productImg?: string;

  @ApiProperty({ example: '15000' })
  price: number;

  @ApiProperty({ example: '4' })
  stock: number;

  @ApiProperty({ example: 'true' })
  isSale: boolean;

  @ApiProperty({
    description: 'Category',
    enum: Category,
    enumName: 'Category',
    default: Category.CLOTHES,
  })
  category?: Category;
}
