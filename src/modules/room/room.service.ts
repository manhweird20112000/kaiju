import { ResponseHttpType, SUCCESS } from 'src/constants';
import { CreateRoomDto } from './dto/create-room.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RoomRepository } from './repository/room.repository';
import { Room } from './entities/room.schema';
import ResponseDataType from 'src/utils/response/ResponseDataType';
import { User } from '../user/entities/user.entity';

@Injectable()
export class RoomService {
  constructor(private readonly repository: RoomRepository) {}

  async createRoom(
    data: CreateRoomDto,
    user: User,
  ): Promise<ResponseHttpType<Room>> {
    const { roomType, userId } = data;
    const exist: Room = await this.repository.existRoom(user.id, userId);
    if (exist) {
      return new ResponseDataType(
        HttpStatus.MOVED_PERMANENTLY,
        exist,
        SUCCESS,
      ).toJSON();
    } else {
      const payload = {
        roomType: roomType,
        userInRoom: [
          {
            id: user.id,
            nickname: null,
          },
          {
            id: userId,
            nickname: null,
          },
        ],
      };

      const room = await this.repository.createRoom(payload);
      return new ResponseDataType(HttpStatus.OK, room, SUCCESS).toJSON();
    }
  }
}
