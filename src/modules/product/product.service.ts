import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/utils/repository/base.service';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repository/product.repository';

@Injectable()
export class ProductService extends BaseService<Product, ProductRepository> {
  constructor(repository: ProductRepository) {
    super(repository);
  }
}
