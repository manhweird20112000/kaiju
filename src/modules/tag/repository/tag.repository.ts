import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async list(
    params: any,
    options: IPaginationOptions,
  ): Promise<Pagination<Tag>> {
    let query = this.createQueryBuilder('tag').select([
      'tag.name',
      'tag.status',
      'tag.description',
      'tag.createdAt',
    ]);

    if ('status' in params) {
      const { status } = params;
      query = query.where('tag.status = :status', { status: status });
    }

    if ('search' in params) {
      const { search } = params;
      query = query.where('tag.name like :search', { search: `%${search}%` });
    }

    query = query.orderBy('tag.id', 'DESC');
    return paginate<Tag>(query, options);
  }
}
