import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaRepository } from './repository/media.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MediaRepository])],
  providers: [],
  exports: [TypeOrmModule],
})
export class MediaModule {}
