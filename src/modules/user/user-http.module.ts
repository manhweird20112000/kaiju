import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { OtpHttpModule } from '../otp/otp-http.module';
import { UserController } from './user.controller';
import { UserModule } from './user.module';
import { UserService } from './user.service';

@Module({
  imports: [UserModule, AuthModule, OtpHttpModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserHttpModule {}
