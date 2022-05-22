import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminHttpModule } from './modules/admin/admin-http.module';
import { MediaHttpModule } from './modules/media/media-http.module';
import { RoleHttpModule } from './modules/role/role-http.module';
import { CategoryHttpModule } from './modules/category/category-http.module';
import { TagHttpModule } from './modules/tag/tag-http.module';
import { ProductHttpModule } from './modules/product/product-http.module';
import { SocketModule } from './utils/socket/socket.module';
import { LoggerWinstonModule } from './utils/logger/logger.module';
import { QuecesModule } from './utils/queces/quece.module';
import { DatabaseModule } from './configs/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    LoggerWinstonModule,
    QuecesModule,
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
