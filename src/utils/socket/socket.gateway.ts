import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { LogService } from '../logger/log.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly logService: LogService) {}

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
