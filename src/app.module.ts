import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminHttpModule } from './modules/admin/admin-http.module';
import { Admin } from './modules/admin/entities/admin.entity';
import { RoleModule } from './modules/role/role.module';
import { CategoryModule } from './modules/category/category.module';
import { Role } from './modules/role/entities/role.entity';
import { MediaModule } from './modules/media/media.module';
import { Media } from './modules/media/entities/media.entity';
import { MediaHttpModule } from './modules/media/media-http.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest-ecommerce',
      entities: [Media, Admin, Role],
      synchronize: true,
    }),
    AdminHttpModule,
    MediaHttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
