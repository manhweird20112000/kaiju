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
    const ext = mimetype.split('/')[1];
    const payload = {
      name: filename + '.' + ext,
      type,
      size,
      ext: mimetype,
      path: path + '.' + ext,
    };
    await this.repository.save(payload);
    return { data: payload, statusCode: HttpStatus.OK, message: SUCCESS };
  }

  
}
