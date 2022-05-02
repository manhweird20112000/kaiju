import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminHttpModule } from './modules/admin/admin-http.module';
import { Admin } from './modules/admin/entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest-ecommerce',
      entities: [Admin],
      synchronize: true,
    }),
    AdminHttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
