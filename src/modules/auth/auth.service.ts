import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => JwtService))
    private jwtService: JwtService,
  ) {}

  async generateJwt(data: any): Promise<string> {
    return this.jwtService.signAsync(data);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hashSync(password, 12);
  }

  async comparePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<any> {
    return bcrypt.compare(password, storedPasswordHash);
  }

  verifyJwt(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }
}
