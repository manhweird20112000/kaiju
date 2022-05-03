import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Status } from 'src/constants';
import { EntityRepository, Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  findOneByEmail(email: string): Promise<Admin> {
    return this.createQueryBuilder().where({ email: email }).getOne();
  }

  findOneByUserName(username: string): Promise<Admin> {
    return this.createQueryBuilder().where({ username: username }).getOne();
  }

  async paginate(
    params: any,
    options: IPaginationOptions,
  ): Promise<Pagination<Admin>> {
    let query = this.createQueryBuilder('admin')
      .select([
        'admin.fullname',
        'admin.username',
        'admin.gender',
        'admin.avatar',
        'admin.status',
        'admin.lastLogin',
        'admin.createdAt',
      ])
      .where('admin.status = :status', { status: Status.active });

    if ('search' in params) {
      const { search } = params;
      query = query.where(
        'concat(admin.fullname, admin.email,admin.username) like :search',
        {
          search: `%${search}%`,
        },
      );
    }

    query = query.orderBy('admin.id', 'DESC');
    return paginate<Admin>(query, options);
  }
}
