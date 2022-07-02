import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { TypeMedia, UserInRoomType } from 'src/constants';
import { Room } from 'src/modules/room/entities/room.schema';

export type MessageDocument = Message & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updateAt' } })
export class Message extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
  roomId: Room;

  @Prop()
  listUserRead: UserInRoomType[];

  @Prop()
  content: string;

  @Prop({ type: 'enum', enum: TypeMedia, default: TypeMedia.text })
  type: TypeMedia;

  @Prop()
  ownerId: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updateAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
