import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CategoryController } from './category.controller';
import { CategoryModule } from './category.module';
import { CategoryService } from './category.service';

@Module({
  imports: [CategoryModule, AuthModule],
  providers: [CategoryService],
  exports: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryHttpModule {}
