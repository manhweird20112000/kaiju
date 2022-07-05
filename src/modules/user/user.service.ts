import { HttpStatus, Injectable } from '@nestjs/common';
import moment from 'moment';
import { ACCOUNT_NOT_EXIST, ResponseHttpType } from 'src/constants';
import Helper from 'src/utils/helper/Helper';
import { BaseService } from 'src/utils/repository/base.service';
import ResponseDataType from 'src/utils/response/ResponseDataType';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(
    repository: UserRepository,
    private readonly authService: AuthService,
  ) {
    super(repository);
  }

  async register(data: CreateUserDto): Promise<ResponseHttpType<User>> {
    const { identification, gender, birthday, password, fullname } = data;
    const exist = await this.repository.findUser(identification);
    let flag = false;

    if (!exist) {
      const payload = {
        fullname,
        birthday,
        gender,
        password,
      };

      if (Helper.isEmail(identification)) {
        payload['email'] = identification;
      } else if (Helper.isPhone(identification)) {
        payload['phone'] = identification;
      } else {
        flag = true;
      }

      payload['password'] = await this.authService.hashPassword(password);
      // payload['birthday'] = new Date(moment(birthday, 'DD-MM-YYYY'));

      const user: User = await this.repository.save(payload);
      return new ResponseDataType(
        HttpStatus.OK,
        user,
        ACCOUNT_NOT_EXIST,
      ).toJSON();
    } else {
      return new ResponseDataType(
        HttpStatus.OK,
        null,
        ACCOUNT_NOT_EXIST,
      ).toJSON();
    }
  }
}
