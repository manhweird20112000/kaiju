import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpDocument } from './entities/otp.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpDocument }]),
  ],
  exports: [MongooseModule],
  providers: [],
})
export class OtpModule {}
