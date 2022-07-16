import { Status } from 'src/constants';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findUser(search: string): Promise<User> {
    return this.createQueryBuilder()
      .select('id')
      .addSelect('email')
      .addSelect('phone')
      .addSelect('status')
      .addSelect('password')
      .addSelect('gender')
      .addSelect('birthday')
      .addSelect('typeAuth')
      .where('concat(email, phone) = :search', {
        search: search,
      })
      .getRawOne();
  }

  setStatusUser(identification: string, type: Status): Promise<UpdateResult> {
    return this.createQueryBuilder()
      .where('concat(phone, email) = :identification', { identification })
      .update(User)
      .set({ status: type })
      .execute();
  }
}
