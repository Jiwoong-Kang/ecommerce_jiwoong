import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductPageMetaDto } from '@common/dtos/product-page-meta.dto';

export class ProductPageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => ProductPageMetaDto })
  readonly meta: ProductPageMetaDto;

  constructor(data: T[], meta: ProductPageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
