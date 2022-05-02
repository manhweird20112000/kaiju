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
}
