import { Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';

@Processor('message')
export class MessageConsumer {
  private readonly logger = new Logger(MessageConsumer.name);
}
