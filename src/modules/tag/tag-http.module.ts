import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TagController } from './tag.controller';
import { TagModule } from './tag.module';
import { TagService } from './tag.service';

@Module({
  imports: [TagModule, AuthModule],
  providers: [TagService],
  controllers: [TagController],
  exports: [TagService],
})
export class TagHttpModule {}
