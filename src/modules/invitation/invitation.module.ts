import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationRepository } from './repository/invitation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InvitationRepository])],
  providers: [],
  exports: [TypeOrmModule],
})
export class InvitationModule {}
