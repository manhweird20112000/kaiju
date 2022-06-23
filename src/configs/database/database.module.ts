import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from 'src/modules/media/entities/media.entity';
import { Admin } from 'src/modules/admin/entities/admin.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { User } from 'src/modules/user/entities/user.entity';

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
        entities: [Media, Admin, Role, User],
        synchronize: configService.get('DB_ASYNC'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
