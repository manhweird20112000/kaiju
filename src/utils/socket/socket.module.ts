import { Module } from '@nestjs/common';
import { LogService } from '../logger/log.service';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [],
  providers: [SocketGateway, LogService],
})
export class SocketModule {}
