import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ValidationPipe } from 'src/utils/validation/validation.service';
import { v4 } from 'uuid';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('store')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/category',
        filename: (req, file, callback) => {
          const ext = path.extname(file.originalname);
          callback(null, v4() + ext);
        },
      }),
    }),
  )
  async store(
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto,
  ) {
    try {
      const data = await this.categoryService.save({
        file,
        ...createCategoryDto,
      });
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
