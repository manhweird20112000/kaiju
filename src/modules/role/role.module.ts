import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './repository/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository])],
  providers: [],
  exports: [TypeOrmModule],
})
export class RoleModule {}
