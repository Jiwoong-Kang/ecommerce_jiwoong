import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // product 전체를 불러오는 api
  @Get('/all')
  async getAllProducts() {
    return await this.productService.getProducts();
  }

  // product를 등록하는 api
  @Post('/create')
  async registerProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.postProduct(createProductDto);
  }

  // product 상세 정보를 가져오는 api
  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProduct(id);
  }

  //모든 product를 삭제하는 api
  @Delete('/delete')
  async deleteAllProducts() {
    return await this.productService.deleteProducts();
  }

  // product의 id에 해당되는 데이터를 삭제하는 api
  @Delete('/:id')
  async deleteProductById(@Param('id') id: string) {
    return await this.productService.deleteProductById(id);
  }

  // product의 id에 해당하는 데이터를 수정하는 api
  @Put('/:id')
  async updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
    //CreateProductDto는 내가 바꿀 내용을 가져오게 한다. 그리고 updateproductDto는 모든지 바꿀수 있는 변수 x라고 생각하면 된다.
  ) {
    return await this.productService.updateProductById(id, updateProductDto);
  }
}
