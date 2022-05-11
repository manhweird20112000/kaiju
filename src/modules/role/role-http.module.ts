import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RoleController } from './role.controller';
import { RoleModule } from './role.module';
import { RoleService } from './role.service';

@Module({
  imports: [RoleModule, AuthModule],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleHttpModule {}
