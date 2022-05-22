import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({ level: 'debug' }),
        new winston.transports.DailyRotateFile({
          dirname: 'logs',
          filename: 'application-%DATE%.log',
          datePattern: 'DD-MM-YYYY',
          zippedArchive: false,
          level: 'info',
          handleExceptions: true,
          maxFiles: '14d',
          maxSize: '20m',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.printf((msg) => {
              return `${msg.timestamp} [${msg.level}] - ${msg.message}`;
            }),
          ),
        }),
      ],
    }),
  ],
})
export class LoggerWinstonModule {}
