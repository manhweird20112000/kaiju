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
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationPipe } from 'src/utils/validation/validation.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

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
  @Get('list')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: number = 10,
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
  //   return this.adminService.update(+id, updateAdminDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminService.remove(+id);
  // }
}
