import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpModule } from './otp.module';
import { OtpRepository } from './otp.repository';
import { OtpService } from './otp.service';

@Module({
  imports: [OtpModule],
  providers: [OtpService, OtpRepository],
  exports: [OtpService],
  controllers: [OtpController],
})
export class OtpHttpModule {}
