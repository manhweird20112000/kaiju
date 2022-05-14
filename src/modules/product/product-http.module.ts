import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProductController } from './product.controller';
import { ProductModule } from './product.module';
import { ProductService } from './product.service';

@Module({
  imports: [ProductModule, AuthModule],
  providers: [ProductService],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductHttpModule {}
