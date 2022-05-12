import { HttpStatus, Injectable } from '@nestjs/common';
import { NOT_FOUND, SUCCESS } from 'src/constants';
import { BaseService } from 'src/utils/repository/base.service';
import { DeleteResult } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RoleService extends BaseService<Role, RoleRepository> {
  constructor(repository: RoleRepository) {
    super(repository);
  }

  async create(data) {
    await this.repository.save(data);
    return { data: data, message: SUCCESS, statusCode: HttpStatus.OK };
  }

  async updateRole(id, data) {
    const exist = await this.repository.findOne(id);
    if (!exist) {
      return {
        data: null,
        message: NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
      };
    } else {
      await this.repository.update(id, data);
      return {
        data,
        message: SUCCESS,
        statusCode: HttpStatus.OK,
      };
    }
  }

  async edit(id: number) {
    const exist = await this.repository.findOne(id);
    if (exist) {
      return { data: exist, message: SUCCESS, statusCode: HttpStatus.OK };
    } else {
      return {
        data: null,
        message: NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
      };
    }
  }

  async deleteRole(id: number) {
    const exist = await this.repository.findOne(id);
    if (exist) {
      await this.repository.delete(id);
      return { data: exist, message: SUCCESS, statusCode: HttpStatus.OK };
    } else {
      return {
        data: null,
        message: NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
      };
    }
  }

  async list(query) {
    const { limit, page, ...params } = query;
    const data = await this.repository.list(params, { limit, page });
    return {
      data: { ...data },
      message: SUCCESS,
      statusCode: HttpStatus.OK,
    };
  }
}
