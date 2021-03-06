import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  async list(
    params: any,
    options: IPaginationOptions,
  ): Promise<Pagination<Role>> {
    let query = this.createQueryBuilder('role').select([
      'role.name',
      'role.description',
      'role.status',
      'role.level',
    ]);

    if ('status' in params) {
      const { status } = params;
      query = query.where('role.status = :status', { status: status });
    }

    if ('search' in params) {
      const { search } = params;
      query = query.where('role.name like :search', { search: `%${search}%` });
    }

    query = query.orderBy('role.id', 'DESC');
    return paginate<Role>(query, options);
  }
}
