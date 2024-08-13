import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Iphone16' })
  name: string;
  @ApiProperty({ example: 'good' })
  description: string;
  @ApiProperty({ example: 'imageExample' })
  productImg: string;
  @ApiProperty({ example: '15000' })
  price: number;
  @ApiProperty({ example: '4' })
  stock: number;
  @ApiProperty({ example: 'true' })
  isSale: boolean;
}
