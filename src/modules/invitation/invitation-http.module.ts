import { Module } from '@nestjs/common';
import { InvitationController } from './invitation.controller';
import { InvitationModule } from './invitation.module';
import { InvitationService } from './invitation.service';

@Module({
  imports: [InvitationModule],
  providers: [InvitationService],
  controllers: [InvitationController],
  exports: [InvitationService],
})
export class InvitationHttpModule {}
