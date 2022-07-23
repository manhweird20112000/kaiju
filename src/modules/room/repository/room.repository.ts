import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from '../entities/room.schema';

@Injectable()
export class RoomRepository {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
  ) {}

  async createRoom(data): Promise<Room> {
    const room = new this.roomModel(data);
    return room.save();
  }
}
