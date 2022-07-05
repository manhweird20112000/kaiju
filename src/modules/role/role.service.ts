import ResponseDataType from 'src/utils/response/ResponseDataType';
import { HttpStatus, Injectable } from '@nestjs/common';
import { NOT_FOUND, ResponseHttpType, SUCCESS } from 'src/constants';
import { BaseService } from 'src/utils/repository/base.service';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RoleService extends BaseService<Role, RoleRepository> {
  constructor(repository: RoleRepository) {
    super(repository);
  }

  async create(data): Promise<ResponseHttpType<Role>> {
    await this.repository.save(data);
    return new ResponseDataType(HttpStatus.OK, data, SUCCESS).toJSON();
  }

  async updateRole(id: number, data: any): Promise<ResponseHttpType<Role>> {
    const exist: Role = await this.repository.findOne(id);
    if (!exist) {
      return new ResponseDataType(
        HttpStatus.NOT_FOUND,
        null,
        NOT_FOUND,
      ).toJSON();
    } else {
      await this.repository.update(id, data);
      return new ResponseDataType(HttpStatus.OK, data, SUCCESS).toJSON();
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
