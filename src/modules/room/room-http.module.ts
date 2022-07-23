import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RoomRepository } from './repository/room.repository';
import { RoomController } from './room.controller';
import { RoomModule } from './room.module';
import { RoomService } from './room.service';

@Module({
  imports: [RoomModule, AuthModule],
  providers: [RoomService, RoomRepository],
  exports: [RoomService],
  controllers: [RoomController],
})
export class RoomHttpModule {}
