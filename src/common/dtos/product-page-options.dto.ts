import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { number } from '@hapi/joi';
import { Order } from '@common/constants/order.constant';

export class ProductPageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @Type(() => number)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => number)
  @IsOptional()
  readonly take?: number = 10;

  @ApiPropertyOptional({ example: 'Dish Washer' })
  @Type(() => String)
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional({ example: 'machine' })
  @Type(() => String)
  @IsOptional()
  readonly category?: string;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
