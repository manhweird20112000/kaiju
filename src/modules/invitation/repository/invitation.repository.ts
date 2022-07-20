import { TypeRequest } from 'src/constants';
import { User } from 'src/modules/user/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Invitation } from '../entities/invitation.entity';

@EntityRepository(Invitation)
export class InvitationRepository extends Repository<Invitation> {
  friendRequest(userId: number, status: TypeRequest = TypeRequest.request) {
    return this.createQueryBuilder('invitation')
      .select([
        'invitation.userIdRequest as userId',
        'invitation.status as status',
        'user.fullname as fullname',
        'user.avatar as avatar',
        'invitation.createAt as createdAt',
      ])
      .innerJoin(User, 'user', 'user.id = invitation.userIdRequest')
      .where('invitation.userId = :userId', { userId })
      .andWhere('invitation.status = :status', { status })
      .getRawMany();
  }
}
