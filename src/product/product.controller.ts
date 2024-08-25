import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '@common/dtos/page-options.dto';
import { PageDto } from '@common/dtos/page.dto';
import { Role } from '@common/enums/role.enum';
import { ProductService } from '@product/product.service';
import { Product } from '@product/entities/product.entity';
import { CreateProductDto } from '@product/dto/create-product.dto';
import RoleGuard from '@auth/guards/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from '@root/minio-client/file.model';

@ApiBearerAuth()
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // product 전체를 불러오는 api
  @Get('/all')
  async getAllProducts(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Product>> {
    return await this.productService.getProducts(pageOptionsDto);
  }

  // product를 등록하는 api
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductDto })
  @ApiBody({
    description: 'A single image file with additional product data',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Product image file',
        },

        name: {
          type: 'string',
          description: 'Name of the product',
          example: 'IPhone16',
        },

        description: {
          type: 'string',
          description: 'Description of the product',
          example: 'This phone is good',
        },

        price: {
          type: 'number',
          description: 'Price of the product',
          example: '640000',
        },

        stock: {
          type: 'number',
          description: 'Stock of the product',
          example: '100',
        },

        category: {
          type: 'string',
          description: 'Category of product',
          example: 'Mobile',
        },
      },
    },
  })
  async registerProduct(
    @UploadedFile() productImg?: BufferedFile,
    @Body() createProductDto?: CreateProductDto,
  ) {
    return await this.productService.postProduct(productImg, createProductDto);
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
  @UseGuards(RoleGuard(Role.ADMIN))
  @Delete('/:id')
  async deleteProductById(@Param('id') id: string) {
    return await this.productService.deleteProductById(id);
  }

  // product의 id에 해당하는 데이터를 수정하는 api
  @UseGuards(RoleGuard(Role.ADMIN))
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductDto })
  @ApiBody({
    description: 'A single image file with additional product data',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Product image file',
        },

        name: {
          type: 'string',
          description: 'Name of the product',
          example: 'IPhone',
        },

        description: {
          type: 'string',
          description: 'Description of the product',
          example: 'This phone works well',
        },

        price: {
          type: 'number',
          description: 'Price of the product',
          example: '5000',
        },

        stock: {
          type: 'number',
          description: 'Stock of the product',
          example: '10',
        },
      },
    },
  })
  async updateProductById(
    @Param('id') id: string,
    @UploadedFile() productImg?: BufferedFile,
    @Body() updateProductDto?: CreateProductDto,
    //CreateProductDto는 내가 바꿀 내용을 가져오게 한다. 그리고 updateproductDto는 모든지 바꿀수 있는 변수 x라고 생각하면 된다.
  ) {
    return await this.productService.updateProductById(
      id,
      productImg,
      updateProductDto,
    );
  }
}
