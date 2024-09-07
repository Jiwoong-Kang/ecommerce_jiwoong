import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@product/entities/product.entity';
import { CreateProductDto } from '@product/dto/create-product.dto';
import { MinioClientService } from '@root/minio-client/minio-client.service';
import { BufferedFile } from '@root/minio-client/file.model';
import { ProductPageOptionsDto } from '@common/dtos/product-page-options.dto';
import { ProductPageDto } from '@common/dtos/product-page.dto';
import { ProductPageMetaDto } from '@common/dtos/product-page-meta.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly minioClientService: MinioClientService,
  ) {}

  async getProducts(
    productPageOptionsDto: ProductPageOptionsDto,
  ): Promise<ProductPageDto<Product>> {
    // const products = await this.productRepository.find();
    // return { count: products.length, data: products };
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (productPageOptionsDto.name) {
      queryBuilder.andWhere('product.name ILIKE :name', {
        name: `%${productPageOptionsDto.name}%`,
      });
    }
    if (productPageOptionsDto.category) {
      queryBuilder.andWhere('product.name ILIKE :name', {
        name: `%${productPageOptionsDto.name}%`,
      });
    }
    queryBuilder
      .orderBy('product.createdAt', productPageOptionsDto.order)
      .skip(productPageOptionsDto.skip)
      .take(productPageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new ProductPageMetaDto({
      itemCount,
      productPageOptionsDto,
    });
    return new ProductPageDto(entities, pageMetaDto);
  }

  async postProduct(image?: BufferedFile, createProductDto?: CreateProductDto) {
    const productImg = await this.minioClientService.createProductImg(
      image,
      'product',
      createProductDto.category,
    );
    const newProduct = await this.productRepository.create({
      productImg,
      ...createProductDto,
    });
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

  async updateProductById(
    id: string,
    image?: BufferedFile,
    updateProductDto?: CreateProductDto,
  ) {
    const productImg = await this.minioClientService.uploadProductImg(
      id,
      image,
      'Product',
    );
    await this.productRepository.update(id, {
      ...updateProductDto,
      productImg,
    });
    const updatedProduct = await this.productRepository.findOneBy({ id });
    if (updatedProduct) {
      return updatedProduct;
    }
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }
}
