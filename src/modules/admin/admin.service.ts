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
      const passwordHash = await this.authService.hashPassword(password);
      const payload = {
        ...data,
        password: passwordHash,
      };
    }
  }
}
