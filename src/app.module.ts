import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminHttpModule } from './modules/admin/admin-http.module';
import { MediaHttpModule } from './modules/media/media-http.module';
import { RoleHttpModule } from './modules/role/role-http.module';
import { SocketModule } from './utils/socket/socket.module';
import { LoggerWinstonModule } from './utils/logger/logger.module';
import { QuecesModule } from './utils/queces/quece.module';
import { DatabaseModule } from './configs/database/database.module';
import { UserHttpModule } from './modules/user/user-http.module';
import { InvitationHttpModule } from './modules/invitation/invitation-http.module';
import { OtpHttpModule } from './modules/otp/otp-http.module';
import { RoomHttpModule } from './modules/room/room-http.module';
import { MessageHttpModule } from './modules/message/message-http.module';

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
    UserHttpModule,
    InvitationHttpModule,
    OtpHttpModule,
    RoomHttpModule,
    MessageHttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
