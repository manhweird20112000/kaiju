import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as path from 'path';
import { ResponseHttpType } from 'src/constants';
import { ValidationPipe } from 'src/utils/validation/validation.service';
import { Transaction } from 'typeorm';
import { v4 } from 'uuid';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Media } from '../media/entities/media.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LocationDto } from './dto/location.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp-dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

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
      this.logger.error(error);
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
      this.logger.error(error);
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
      this.logger.error(error);
      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update-avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/user',
        filename: (req, file, callback) => {
          const ext = path.extname(file.originalname);
          callback(null, v4() + ext);
        },
      }),
    }),
  )
  async updateAvatar(
    @Res() res: Response,
    @UploadedFile() avatar: Express.Multer.File,
    @Req() req: Request,
  ) {
    try {
      const user: any = req.user;
      const data: ResponseHttpType<Media> = await this.userService.updateAvatar(
        user,
        avatar,
      );
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      this.logger.error(error);
      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update-location')
  async updateLocation(
    @Res() res: Response,
    @Req() req: Request,
    @Body(new ValidationPipe()) locationDto: LocationDto,
  ) {
    try {
      const user: any = req.user;
      const data: ResponseHttpType<any> = await this.userService.updateLocation(
        user,
        locationDto,
      );
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      this.logger.error(error);
      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
