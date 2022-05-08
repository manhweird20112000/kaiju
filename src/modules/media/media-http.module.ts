import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { MediaController } from './media.controller';
import { MediaModule } from './media.module';
import { MediaService } from './media.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get('MEDIA_STORE'),
      }),
      inject: [ConfigService],
    }),
    MediaModule,
  ],
  providers: [MediaService],
  controllers: [MediaController],
  exports: [MediaService],
})
export class MediaHttpModule {}
