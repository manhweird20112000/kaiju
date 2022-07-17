import { HttpStatus, Injectable } from '@nestjs/common';
import { SUCCESS } from 'src/constants';
import { BaseService } from 'src/utils/repository/base.service';
import { Media } from './entities/media.entity';
import { MediaRepository } from './repository/media.repository';

@Injectable()
export class MediaService extends BaseService<Media, MediaRepository> {
  constructor(repository: MediaRepository) {
    super(repository);
  }

  async sigleFileUpload(data) {
    const { mimetype, filename, size, path, type = 'image' } = data;
    const payload = {
      name: filename,
      type,
      size,
      ext: mimetype,
      path,
    };
    const media: Media = await this.repository.save(payload);
    return media;
  }

  async findMedia(id: number) {
    const exist: Media = await this.repository.findOne(id);
    if (exist) {
      return exist;
    }
  }
}
