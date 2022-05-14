import { Injectable, HttpStatus } from '@nestjs/common';
import { SUCCESS, TypeMedia } from 'src/constants';
import { BaseService } from 'src/utils/repository/base.service';
import { Media } from '../media/entities/media.entity';
import { MediaRepository } from '../media/repository/media.repository';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repository/category.repository';

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
    const { filename, size, path, mimetype } = file;
    const media: Media = await this.mediaRepository.save({
      name: filename,
      path,
      size,
      ext: mimetype,
      type: TypeMedia.image,
    });
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
}
