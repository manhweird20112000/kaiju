import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MessageColor, TypeRoom, UserInRoomType } from 'src/constants';

export type RoomDocument = Room & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updateAt' } })
export class Room extends Document {
  @Prop()
  name: string;

  @Prop({ enum: MessageColor, default: MessageColor.default })
  color: string;

  @Prop({ enum: TypeRoom, default: TypeRoom.user })
  roomType: TypeRoom;

  @Prop()
  avatar: string;

  @Prop()
  userInRoom: UserInRoomType[];

  @Prop()
  theme: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updateAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
