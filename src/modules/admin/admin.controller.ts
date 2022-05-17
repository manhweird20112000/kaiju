import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  UseGuards,
  Query,
  Get,
  DefaultValuePipe,
  ParseIntPipe,
  Req,
  Patch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EmailService } from 'src/utils/email/email.service';
import { ValidationPipe } from 'src/utils/validation/validation.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { AdminService } from './admin.service';
import { ChangePasswordAdminDto } from './dto/change-password.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly emailService: EmailService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Post('save')
  async create(
    @Body(new ValidationPipe()) createAdminDto: CreateAdminDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.adminService.create(createAdminDto);
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('signin')
  async login(
    @Body(new ValidationPipe()) loginAdminDto: LoginAdminDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.adminService.login(loginAdminDto);
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const data = await this.adminService.list({ ...req.query, page, limit });
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @Res() res: Response,
    @Req() req: Request,
    @Body(new ValidationPipe()) changePasswordAdminDto: ChangePasswordAdminDto,
  ) {
    try {
      const data = await this.adminService.changePassword(
        req.user,
        changePasswordAdminDto,
      );
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
