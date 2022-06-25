import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/utils/repository/base.service';
import { Invitation } from './entities/invitation.entity';
import { InvitationRepository } from './repository/invitation.repository';

@Injectable()
export class InvitationService extends BaseService<
  Invitation,
  InvitationRepository
> {
  constructor(repository: InvitationRepository) {
    super(repository);
  }
}
