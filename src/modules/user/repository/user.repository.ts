import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findUser(search: string): Promise<User> {
    return this.createQueryBuilder()
      .where('concat(email, phone) = :search', {
        search: search,
      })
      .getRawOne();
  }
}
