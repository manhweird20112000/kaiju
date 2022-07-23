import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../entities/message.schema';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async save(data): Promise<Message> {
    const message = new this.messageModel(data);
    return message.save();
  }
}
