import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';
import { TypeMedia } from 'src/constants';
import { Room } from 'src/modules/room/entities/room.schema';

export type MessageDocument = Message & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updateAt' } })
export class Message extends Document {
  @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Room' })
  roomId: Room;

  @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Message', default: null })
  messageId: Message;

  @Prop()
  listUserRead: number[];

  @Prop()
  content: string;

  @Prop({ type: String, enum: TypeMedia, default: TypeMedia.text })
  type: TypeMedia;

  @Prop()
  ownerId: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updateAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
