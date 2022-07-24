import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  Inject,
  Logger,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ResponseHttpType } from 'src/constants';
import { ValidationPipe } from 'src/utils/validation/validation.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.schema';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/send')
  async send(
    @Res() res: Response,
    @Req() req: Request,
    @Body(new ValidationPipe()) createMessageDto: CreateMessageDto,
  ) {
    try {
      const user: any = req.user;
      const data: ResponseHttpType<Message> =
        await this.messageService.sendMessage(createMessageDto, user);
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      this.logger.error(error);
      return new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/read/:id')
  async read(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') id: string,
  ) {
    try {
      const user: any = req.user;
      const data: ResponseHttpType<Message> =
        await this.messageService.readMessage(id, user);
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      this.logger.error(error);
      return new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
