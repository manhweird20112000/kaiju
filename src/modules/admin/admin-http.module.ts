import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminModule } from './admin.module';
import { AdminService } from './admin.service';

@Module({
  imports: [AdminModule, AuthModule],
  providers: [AdminService],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminHttpModule {}
