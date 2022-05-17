import { Module } from '@nestjs/common';
import { EmailModule } from 'src/utils/email/email.module';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminModule } from './admin.module';
import { AdminService } from './admin.service';

@Module({
  imports: [AdminModule, AuthModule, EmailModule],
  providers: [AdminService],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminHttpModule {}
