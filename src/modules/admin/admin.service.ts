import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/utils/repository/base.service';
import { Admin } from './entities/admin.entity';
import { AdminRepository } from './repository/admin.repository';

@Injectable()
export class AdminService extends BaseService<Admin, AdminRepository> {
  constructor(repository: AdminRepository) {
    super(repository);
  }
}
