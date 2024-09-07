import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { number, string } from '@hapi/joi';
import { Order } from '@common/constants/order.constant';

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @Type(() => number)
  // @IsInt()
  // @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => number)
  // @Min(1)
  // @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  @ApiPropertyOptional({ example: 'Jiwoong' })
  @Type(() => String)
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional({ example: 'dnd0311@naver.com' })
  @Type(() => String)
  @IsOptional()
  readonly email?: string;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
