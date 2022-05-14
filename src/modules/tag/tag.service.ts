import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/utils/repository/base.service';
import { Tag } from './entities/tag.entity';
import { TagRepository } from './repository/tag.repository';

@Injectable()
export class TagService extends BaseService<Tag, TagRepository> {
  constructor(repository: TagRepository) {
    super(repository);
  }
}
