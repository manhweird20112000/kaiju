import { Inject, Logger } from '@nestjs/common';
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

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  handleDisconnect(client: any) {
    console.log('client dissconnect');
  }
  afterInit(server: any) {
    console.log('Socket has been initialized.');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('connection');
  }

  @SubscribeMessage('hsweird')
  emit() {
    this.server.sockets.emit('hsweird', { message: 'hello' });
  }
}
