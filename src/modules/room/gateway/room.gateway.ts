import { Inject, Logger, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Server } from 'socket.io';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';

@WebSocketGateway({ cors: { origin: '*' } })
export class RoomGateWay
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  handleDisconnect(client: any) {
    console.log('đã disconnect');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('đang connect');
  }
  afterInit(server: any) {
    console.log('Sau khi init socket');
  }

  @SubscribeMessage('connection')
  async emitConnection() {
    this.server.emit('connection', true);
  }
}
