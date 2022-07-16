import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ResponseHttpType } from 'src/constants';
import { ValidationPipe } from 'src/utils/validation/validation.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp-dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'User đăng ký tài khoản.' })
  @ApiParam(CreateUserDto)
  @Post('register')
  async register(
    @Res() res: Response,
    @Req() req: Request,
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ) {
    try {
      const data: ResponseHttpType<User> = await this.userService.register(
        createUserDto,
      );
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/verify-otp')
  async verifyOtp(
    @Res() res: Response,
    @Req() req: Request,
    @Body(new ValidationPipe()) verfifyOtpDto: VerifyOtpDto,
  ) {
    try {
      const data: ResponseHttpType<any> = await this.userService.verifyOtp(
        verfifyOtpDto,
      );
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/login')
  async login(
    @Res() res: Response,
    @Req() req: Request,
    @Body(new ValidationPipe()) loginDto: LoginDto,
  ) {
    try {
      const data: ResponseHttpType<User> = await this.userService.login(
        loginDto,
      );
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      console.log(error);
      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
