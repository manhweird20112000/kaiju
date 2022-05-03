import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();

      const authorization = request.headers['authorization'];
      const token: string = authorization.split(' ')[1];
      if (token) {
        const isVerifyToken = await this.authService.verifyJwt(token);
        request.user = isVerifyToken;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
