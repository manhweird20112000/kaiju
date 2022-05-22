import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  @Get()
  getHello(@Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json(this.appService.getHello());
    } catch (error) {
      this.logger.error(error);
    }
  }
}
