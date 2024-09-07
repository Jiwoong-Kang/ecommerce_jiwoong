import { ApiProperty } from '@nestjs/swagger';
import { ProductPageMetaDtoParameters } from '@common/interfaces/product-page-meta-dto-parameters.interface';

export class ProductPageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({
    productPageOptionsDto,
    itemCount,
  }: ProductPageMetaDtoParameters) {
    this.page = productPageOptionsDto.page;
    this.take = productPageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
