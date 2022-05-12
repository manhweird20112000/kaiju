import { CategoryRepository } from './repository/category.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TypeOrmModule.forFeature([CategoryRepository])],
  providers: [],
  exports: [TypeOrmModule],
})
export class CategoryModule {}
