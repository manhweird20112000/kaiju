import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/utils/repository/base.service';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(repository: UserRepository) {
    super(repository);
  }
}
