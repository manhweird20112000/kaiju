import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateRequest } from 'firebase-admin/lib/auth/auth-config';
import { ResponseHttpType, SUCCESS } from 'src/constants';
import { BaseService } from 'src/utils/repository/base.service';
import ResponseDataType from 'src/utils/response/ResponseDataType';
import { User } from '../user/entities/user.entity';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
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

  async requestYou(
    user: User,
    createInvitationDto: CreateInvitationDto,
  ): Promise<ResponseHttpType<Invitation>> {
    const payload = {
      user: { id: createInvitationDto.userId },
      status: createInvitationDto.status,
      userIdRequest: user.id,
    };
    const request: Invitation = await this.repository.save(payload);
    return new ResponseDataType(HttpStatus.OK, request, SUCCESS).toJSON();
  }

  async setRequestYou(
    invitationId: number,
    updateInvitationDto: UpdateInvitationDto,
  ): Promise<ResponseHttpType<Invitation>> {
    await this.repository.update(invitationId, {
      status: updateInvitationDto.status,
    });
    return new ResponseDataType(HttpStatus.OK, null, SUCCESS).toJSON();
  }

  async getFriendRequest(user: User): Promise<ResponseHttpType<Invitation>> {
    const listFriendRequest: Invitation[] = await this.repository.friendRequest(
      user.id,
    );

    return new ResponseDataType(
      HttpStatus.OK,
      listFriendRequest,
      SUCCESS,
    ).toJSON();
  }
}
