import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/utils/repository/base.service';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class CategoryService extends BaseService<Category, CategoryRepository> {
  constructor(repository: CategoryRepository) {
    super(repository);
  }
}
