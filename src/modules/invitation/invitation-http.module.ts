import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { InvitationController } from './invitation.controller';
import { InvitationModule } from './invitation.module';
import { InvitationService } from './invitation.service';

@Module({
  imports: [InvitationModule, AuthModule],
  providers: [InvitationService],
  controllers: [InvitationController],
  exports: [InvitationService],
})
export class InvitationHttpModule {}
