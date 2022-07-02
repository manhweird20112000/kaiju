import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp, OtpDocument } from './entities/otp.schema';

@Injectable()
export class OtpRepository {
  constructor(
    @InjectModel(Otp.name) private readonly otpModel: Model<OtpDocument>,
  ) {}

  async getLatestOtp(identification: string): Promise<Otp> {
    return this.otpModel
      .findOne(
        { identification: identification },
        { code: 1, identification: 1 },
      )
      .sort({ createdAt: -1 })
      .exec();
  }

  async createOtp(identification: string, code: number): Promise<Otp> {
    const otp = new this.otpModel({ identification, code });
    return otp.save();
  }
}
