import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminController } from './admin.controller';
import { AdminModule } from './admin.module';
import { AdminService } from './admin.service';

@Module({
  imports: [AdminModule, ConfigService],
  providers: [AdminService],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminHttpModule {}
