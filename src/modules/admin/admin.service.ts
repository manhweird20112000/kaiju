import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/utils/repository/base.service';
import { AuthService } from '../auth/auth.service';
import { Admin } from './entities/admin.entity';
import { AdminRepository } from './repository/admin.repository';

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
      return { ...admin, password: null };
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
        };
        const accessToken: string = await this.authService.generateJwt(payload);
        console.log(accessToken);
        return { ...payload, accessToken };
      }
    }
  }
}
