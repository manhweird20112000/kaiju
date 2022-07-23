import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MessageController } from './message.controller';
import { MessageModule } from './message.module';
import { MessageService } from './message.service';
import { MessageRepository } from './repository/message.repository';

@Module({
  imports: [MessageModule, AuthModule],
  providers: [MessageService, MessageRepository],
  exports: [MessageService],
  controllers: [MessageController],
})
export class MessageHttpModule {}
