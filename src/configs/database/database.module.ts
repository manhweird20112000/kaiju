import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from 'src/modules/media/entities/media.entity';
import { Admin } from 'src/modules/admin/entities/admin.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import { Product } from 'src/modules/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Media, Admin, Role, Category, Tag, Product],
        synchronize: configService.get('DB_ASYNC'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
