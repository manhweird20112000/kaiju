import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class MessageProducer {
  constructor(@InjectQueue('message') private readonly queue: Queue) {}

  async send(message) {
    await this.queue.add('sendMessage', message);
  }

  async read(message) {
    await this.queue.add('readMessage', message);
  }
}
