import { HttpStatus, Injectable } from '@nestjs/common';
import { NOT_FOUND, SUCCESS } from 'src/constants';
import { BaseService } from 'src/utils/repository/base.service';
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
    console.log(exist);
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

  async list(query) {
    const { limit, page, ...params } = query;
    const data = await this.repository.paginate(params, { limit, page });
    return {
      data: { ...data },
      message: SUCCESS,
      statusCode: HttpStatus.OK,
    };
  }
}
