import { Injectable, LoggerService } from "@nestjs/common";

@Injectable()
export class LogService implements  LoggerService{
  debug(message: any, ...optionalParams: any[]): any {
  }

  error(message: any, ...optionalParams: any[]): any {
  }

  log(message: any, ...optionalParams: any[]): any {
  }


  verbose(message: any, ...optionalParams: any[]): any {
  }

  warn(message: any, ...optionalParams: any[]): any {
  }

}