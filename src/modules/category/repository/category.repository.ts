import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Category } from './../entities/category.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async paginate(
    params,
    options: IPaginationOptions,
  ): Promise<Pagination<Category>> {
    let query = this.createQueryBuilder('category').select([
      'category.name',
      'category.status',
      'category.description',
      'category.avatar',
      'category.parentId',
    ]);

    if ('search' in params) {
      const { search } = params;
      query = query.where('category.name like :search', { search });
    }

    if ('status' in params) {
      const { status } = params;
      query = query.where('category.status = :status', { status });
    }

    query = query.orderBy('category.id', 'DESC');

    return paginate<Category>(query, options);
  }
}
