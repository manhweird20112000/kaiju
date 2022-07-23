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
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ResponseHttpType } from 'src/constants';
import { ValidationPipe } from 'src/utils/validation/validation.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './entities/room.schema';
import { RoomService } from './room.service';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/store')
  async store(
    @Res() res: Response,
    @Req() req: Request,
    @Body(new ValidationPipe()) createRoomDto: CreateRoomDto,
  ) {
    try {
      const user: any = req.user;
      const data: ResponseHttpType<Room> = await this.roomService.createRoom(
        createRoomDto,
        user,
      );
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      this.logger.error(error);
      console.log(error);
      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
