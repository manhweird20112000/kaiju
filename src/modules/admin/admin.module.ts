import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './repository/admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository])],
  providers: [],
  exports: [TypeOrmModule],
})
export class AdminModule {}
