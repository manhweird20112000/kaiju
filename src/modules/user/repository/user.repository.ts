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
      .where('concat(email, phone) like :search', {
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

  updateAvatar(userId: number, mediaId: any): Promise<UpdateResult> {
    return this.createQueryBuilder()
      .where('id = :userId', { userId })
      .update(User)
      .set({ avatar: mediaId })
      .execute();
  }

  updateDataAssign(userId: number, payload: any): Promise<UpdateResult> {
    return this.createQueryBuilder()
      .where('id = :userId', { userId })
      .update(User)
      .set(payload)
      .execute();
  }
}
