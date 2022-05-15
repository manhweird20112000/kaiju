import { Injectable, HttpStatus } from '@nestjs/common';
import { NOT_FOUND, SUCCESS } from 'src/constants';
import { BaseService } from 'src/utils/repository/base.service';
import { UpdateResult } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagRepository } from './repository/tag.repository';

@Injectable()
export class TagService extends BaseService<Tag, TagRepository> {
  constructor(repository: TagRepository) {
    super(repository);
  }

  async save(data: CreateTagDto) {
    const tag: Tag = await this.repository.save(data);
    return {
      data: tag,
      statusCode: HttpStatus.OK,
      message: SUCCESS,
    };
  }

  async remove(id: number) {
    const tag: Tag = await this.repository.findOne(id);
    if (!tag) {
      return {
        data: null,
        statusCode: HttpStatus.NOT_FOUND,
        message: NOT_FOUND,
      };
    } else {
      await this.repository.softDelete(id);
      return {
        data: tag,
        statusCode: HttpStatus.OK,
        message: SUCCESS,
      };
    }
  }

  async updateTag(id: number, data: UpdateTagDto) {
    const tag: Tag = await this.repository.findOne(id);
    if (!tag) {
      return {
        data: null,
        statusCode: HttpStatus.NOT_FOUND,
        message: NOT_FOUND,
      };
    } else {
      const tagUpdate: UpdateResult = await this.repository.update(id, data);
      return {
        data: tagUpdate,
        statusCode: HttpStatus.OK,
        message: SUCCESS,
      };
    }
  }

  async list({ limit, page, ...params }) {
    const data = await this.repository.list(params, { limit, page });
    return {
      data: data,
      statusCode: HttpStatus.OK,
      message: SUCCESS,
    };
  }

  async detail(id: number) {
    const tag: Tag = await this.repository.findOne(id);
    if (!tag) {
      return {
        data: null,
        statusCode: HttpStatus.NOT_FOUND,
        message: NOT_FOUND,
      };
    } else {
      return {
        data: tag,
        statusCode: HttpStatus.OK,
        message: SUCCESS,
      };
    }
  }
}
