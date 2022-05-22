import { Injectable, Logger } from '@nestjs/common';
import { LogService } from './utils/logger/log.service';

@Injectable()
export class AppService {
  // constructor(private readonly logService: LogService) {
  //   this.logService.log('App Service');
  // }

  getHello() {
    return { message: '你 好.' };
  }
}
