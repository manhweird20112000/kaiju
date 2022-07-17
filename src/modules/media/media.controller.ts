import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Res,
  Get,
  Param,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import { Media } from './entities/media.entity';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // @Post('store')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, callback) => {
  //         const ext = path.extname(file.originalname);
  //         callback(null, v4() + ext);
  //       },
  //     }),
  //   }),
  // )
  // async sigleUploadFile(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const data = await this.mediaService.sigleFileUpload(file);
  //     return res.status(HttpStatus.OK).json({ ...data });
  //   } catch (error) {
  //     throw new HttpException(
  //       'Internal Server Error.',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  @Get('/image/:id')
  async getImageInStorage(@Param('id') id: number, @Res() res: Response) {
    try {
      const media: Media = await this.mediaService.findMedia(id);
      if (media) {
        const rootFolder = __dirname.split('dist');
        return res.sendFile(rootFolder[0] + '/' + media.path);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
