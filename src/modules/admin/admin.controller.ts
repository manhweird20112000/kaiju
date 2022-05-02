import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('save')
  create(@Body() createAdminDto: CreateAdminDto) {
    try {
      return this.adminService.create(createAdminDto);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('signin')
  login(@Body() data: any) {
    try {
      return this.adminService.login(data);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // @Get()
  // findAll() {
  //   return 'admin';
  // }

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
