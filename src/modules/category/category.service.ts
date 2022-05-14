import { NOT_FOUND } from './../../constants/index';
import { Injectable, HttpStatus } from '@nestjs/common';
import { SUCCESS, TypeMedia } from 'src/constants';
import { BaseService } from 'src/utils/repository/base.service';
import { Media } from '../media/entities/media.entity';
import { MediaRepository } from '../media/repository/media.repository';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repository/category.repository';
import { UpdateResult } from 'typeorm';

@Injectable()
export class CategoryService extends BaseService<Category, CategoryRepository> {
  constructor(
    repository: CategoryRepository,
    private readonly mediaRepository: MediaRepository,
  ) {
    super(repository);
  }

  async save(data) {
    const { file, ...payload } = data;
    const media: Media = await this.handleMediaTypeImage(file);
    const category: Category = await this.repository.save({
      ...payload,
      avatar: media.id,
    });
    return {
      data: category,
      message: SUCCESS,
      statusCode: HttpStatus.OK,
    };
  }

  async updateCategory(id: number, data) {
    const exist: Category = await this.repository.findOne(id);
    if (!exist) {
      return {
        data: null,
        message: NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
      };
    } else {
      const { file, ...payload } = data;
      const media: Media = await this.handleMediaTypeImage(file);
      const updateCategory: UpdateResult = await this.repository.update(id, {
        ...payload,
        avatar: media.id,
      });
      return {
        data: updateCategory,
        statusCode: HttpStatus.OK,
        message: SUCCESS,
      };
    }
  }

  async list(query) {
    const { limit, page, ...params } = query;
    const data = await this.repository.paginate(params, { limit, page });
    return {
      data: { ...data },
      message: SUCCESS,
      statusCode: HttpStatus.OK,
    };
  }

  async detail(id: number) {
    const exist: Category = await this.repository.findOne(id);
    if (!exist) {
      return {
        data: null,
        message: NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
      };
    } else {
      return {
        data: exist,
        message: SUCCESS,
        statusCode: HttpStatus.OK,
      };
    }
  }

  async remove(id: number) {
    const exist: Category = await this.repository.findOne(id);
    if (!exist) {
      return {
        data: null,
        message: NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
      };
    } else {
      await this.repository.softDelete(id);
      return {
        data: exist,
        message: SUCCESS,
        statusCode: HttpStatus.OK,
      };
    }
  }

  async handleMediaTypeImage(file: Express.Multer.File) {
    const { filename, size, path, mimetype } = file;
    const media: Media = await this.mediaRepository.save({
      name: filename,
      path,
      size,
      ext: mimetype,
      type: TypeMedia.image,
    });
    return media;
  }
}
