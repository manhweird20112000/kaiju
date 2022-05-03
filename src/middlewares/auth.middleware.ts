import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthJwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    console.log('Requesting...');
    next();
  }
}
