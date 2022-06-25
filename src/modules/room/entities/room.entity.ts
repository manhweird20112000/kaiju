import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TypeRoom, UserInRoomType } from 'src/constants';

export type RoomDocument = Room & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updateAt' } })
export class Room extends Document {
  @Prop()
  name: string;

  @Prop()
  color: string;

  @Prop()
  ownerId: number;

  @Prop({ enum: TypeRoom, default: TypeRoom.user })
  roomType: TypeRoom;

  @Prop()
  avatar: string;

  @Prop()
  userInRoom: UserInRoomType[];

  @Prop()
  createdAt: Date;

  @Prop()
  updateAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
