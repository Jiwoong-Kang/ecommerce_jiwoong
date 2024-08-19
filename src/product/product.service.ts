import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageDto } from '../common/dtos/page.dto';
import { PageMetaDto } from '../common/dtos/page-meta.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts(pageOptionsDto: PageOptionsDto): Promise<PageDto<Product>> {
    // const products = await this.productRepository.find();
    // return { count: products.length, data: products };
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    queryBuilder
      .orderBy('product.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async postProduct(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepository.create(createProductDto);
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  async getProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async deleteProducts() {
    const deleteResponse = await this.productRepository.delete({});
    if (deleteResponse.affected === 0) {
      throw new HttpException('Something new Error', HttpStatus.BAD_REQUEST);
    }
    return 'Deleted all Products';
  }

  async deleteProductById(id: string) {
    const deleteResponse = await this.productRepository.delete({ id });
    if (!deleteResponse.affected) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return 'Product deleted successfully.';
  }

  async updateProductById(id: string, updateProductDto: CreateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    const updatedProduct = await this.productRepository.findOneBy({ id });
    if (updatedProduct) {
      return updatedProduct;
    }
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }
}
