import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminHttpModule } from './modules/admin/admin-http.module';
import { Admin } from './modules/admin/entities/admin.entity';
import { Role } from './modules/role/entities/role.entity';
import { Media } from './modules/media/entities/media.entity';
import { MediaHttpModule } from './modules/media/media-http.module';
import { RoleHttpModule } from './modules/role/role-http.module';
import { Category } from './modules/category/entities/category.entity';
import { CategoryHttpModule } from './modules/category/category-http.module';
import { TagHttpModule } from './modules/tag/tag-http.module';
import { Tag } from './modules/tag/entities/tag.entity';
import { ProductHttpModule } from './modules/product/product-http.module';
import { Product } from './modules/product/entities/product.entity';
import { SocketModule } from './utils/socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ecommerce',
      entities: [Media, Admin, Role, Category, Tag, Product],
      synchronize: true,
    }),
    SocketModule,
    AdminHttpModule,
    MediaHttpModule,
    RoleHttpModule,
    CategoryHttpModule,
    TagHttpModule,
    ProductHttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
