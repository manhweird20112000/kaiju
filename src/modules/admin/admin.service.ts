import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  ACCOUNT_NOT_EXIST,
  CREATED,
  EMAIL_ALREADY_IN_USE,
  PASSWORD_FAIL,
  Status,
  SUCCESS,
} from 'src/constants';
import { BaseService } from 'src/utils/repository/base.service';
import { AuthService } from '../auth/auth.service';
import { Admin } from './entities/admin.entity';
import { AdminRepository } from './repository/admin.repository';
import moment from 'moment';

@Injectable()
export class AdminService extends BaseService<Admin, AdminRepository> {
  constructor(
    repository: AdminRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {
    super(repository);
  }

  async create(data) {
    const { email, password } = data;
    const exist = await this.repository.findOneByEmail(email);

    if (!exist) {
      const passwordHash = await this.authService.hashPassword(
        String(password),
      );
      const username = email.split('@')[0];
      const payload = {
        ...data,
        username,
        password: passwordHash,
      };
      const admin = await this.store(payload);
      return {
        data: { ...admin, password: null },
        message: CREATED,
        statusCode: HttpStatus.OK,
      };
    } else {
      return {
        data: null,
        message: EMAIL_ALREADY_IN_USE,
        statusCode: HttpStatus.OK,
      };
    }
  }

  async login(data) {
    const { username, password } = data;
    const exist: Admin = await this.repository.findOneByUserName(username);
    if (exist) {
      const isPassword: boolean = await this.authService.comparePassword(
        password,
        exist.password,
      );
      if (isPassword) {
        const payload = {
          ...exist,
          password: null,
          status: Status.active,
        };

        if (payload.lastLogin === null) {
          await this.repository.update(exist.id, {
            status: Status.active,
            lastLogin: new Date().getTime(),
          });
        }

        const accessToken: string = await this.authService.generateJwt(payload);

        return {
          data: { ...payload, accessToken },
          message: SUCCESS,
          statusCode: HttpStatus.OK,
        };
      } else {
        return {
          data: null,
          message: PASSWORD_FAIL,
          statusCode: HttpStatus.OK,
        };
      }
    } else {
      return {
        data: null,
        message: ACCOUNT_NOT_EXIST,
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
