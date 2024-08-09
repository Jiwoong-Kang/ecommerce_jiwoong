import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Iphone16' })
  name: string;
  @ApiProperty({ example: 'good' })
  description: string;
  @ApiProperty({ example: '1234' })
  productImg: string;
  price: number;
  stock: number;
  isSale: boolean;
}
