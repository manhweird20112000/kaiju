import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseHttpType, SUCCESS } from 'src/constants';
import ResponseDataType from 'src/utils/response/ResponseDataType';
import { RoomService } from '../room/room.service';
import { User } from '../user/entities/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.schema';
import { MessageRepository } from './repository/message.repository';

@Injectable()
export class MessageService {
  constructor(private readonly repository: MessageRepository) {}

  async sendMessage(
    createMessageDto: CreateMessageDto,
    user: User,
  ): Promise<ResponseHttpType<Message>> {
    const payload = {
      ...createMessageDto,
      listUserRead: [user.id],
    };
    const message: Message = await this.repository.save(payload);
    return new ResponseDataType(HttpStatus.OK, message, SUCCESS).toJSON();
  }

  async readMessage(
    roomId: string,
    user: User,
  ): Promise<ResponseHttpType<Message>> {
    const message = await this.repository.read(roomId, user.id);
    return new ResponseDataType(HttpStatus.OK, message, SUCCESS).toJSON();
  }
}
