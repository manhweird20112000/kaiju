import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ResponseHttpType } from 'src/constants';
import { ValidationPipe } from 'src/utils/validation/validation.service';
import { v4 } from 'uuid';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
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
      const data: ResponseHttpType = await this.categoryService.save({
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

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
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
  async update(
    @Res() res: Response,
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const data: ResponseHttpType = await this.categoryService.updateCategory(
        id,
        { file, ...updateCategoryDto },
      );
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const data: ResponseHttpType = await this.categoryService.list({
        page,
        limit,
        ...req.query,
      });
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('detail/:id')
  async detail(@Param('id') id: number, @Res() res: Response) {
    try {
      const data: ResponseHttpType = await this.categoryService.detail(id);
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    try {
      const data: ResponseHttpType = await this.categoryService.remove(id);
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
