import { HttpStatus, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import {
  ACCOUNT_NOT_EXIST,
  NOT_FOUND,
  PASSWORD_FAIL,
  ResponseHttpType,
  Status,
  SUCCESS,
  VERIFY_FAIL,
} from 'src/constants';
import Helper from 'src/utils/helper/Helper';
import { BaseService } from 'src/utils/repository/base.service';
import ResponseDataType from 'src/utils/response/ResponseDataType';
import { AuthService } from '../auth/auth.service';
import { Otp } from '../otp/entities/otp.schema';
import { OtpService } from '../otp/otp.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp-dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(
    repository: UserRepository,
    private readonly authService: AuthService,
    private readonly otpService: OtpService,
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
      payload['birthday'] = moment(birthday, 'DD-MM-YYYY').format();
      payload['status'] = Status.inactive;

      const [user, otp]: [User, Otp] = await Promise.all([
        this.repository.save(payload),
        this.otpService.createOtp(identification),
      ]);

      delete user.password;

      return new ResponseDataType(HttpStatus.OK, user, SUCCESS).toJSON();
    } else {
      return new ResponseDataType(
        HttpStatus.OK,
        null,
        ACCOUNT_NOT_EXIST,
      ).toJSON();
    }
  }

  async verifyOtp(data: VerifyOtpDto): Promise<ResponseHttpType<boolean>> {
    const { identification, code } = data;
    const exist = await this.otpService.getLatestOtp(identification);
    if (!exist) {
      return new ResponseDataType(HttpStatus.OK, false, VERIFY_FAIL).toJSON();
    } else {
      const isVerify = await this.otpService.verifyOtp(identification, code);
      if (isVerify) {
        await this.repository.setStatusUser(
          exist.identification,
          Status.active,
        );
        return new ResponseDataType(HttpStatus.OK, isVerify, SUCCESS).toJSON();
      } else {
        return new ResponseDataType(
          HttpStatus.OK,
          isVerify,
          VERIFY_FAIL,
        ).toJSON();
      }
    }
  }

  async login(loginDto: LoginDto): Promise<ResponseHttpType<User>> {
    const { identification, password } = loginDto;
    const exist: User = await this.repository.findUser(identification);
    if (!exist) {
      return new ResponseDataType(
        HttpStatus.NOT_FOUND,
        null,
        NOT_FOUND,
      ).toJSON();
    } else {
      const isPassword: boolean = await this.authService.comparePassword(
        password,
        exist.password,
      );
      if (!isPassword) {
        return new ResponseDataType(
          HttpStatus.CONFLICT,
          null,
          PASSWORD_FAIL,
        ).toJSON();
      } else {
        delete exist.password;
        const payload = {
          id: exist.id,
          typeAuth: exist.typeAuth,
          birthday: exist.birthday,
        };
        const accessToken: string = await this.authService.generateJwt(payload);
        exist['accessToken'] = accessToken;
        return new ResponseDataType(HttpStatus.OK, exist, SUCCESS).toJSON();
      }
    }
  }

  
}
