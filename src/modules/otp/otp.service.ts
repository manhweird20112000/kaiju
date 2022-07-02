import { Injectable } from '@nestjs/common';
import { Otp } from './entities/otp.schema';
import { OtpRepository } from './otp.repository';

@Injectable()
export class OtpService {
  constructor(private readonly repository: OtpRepository) {}

  async createOtp(identification: string): Promise<Otp> {
    const code = Math.floor(100000 + Math.random() * 900000);
    return this.repository.createOtp(identification, code);
  }

  async getLatestOtp(identification: string): Promise<Otp> {
    return this.repository.getLatestOtp(identification);
  }

  async verifyOtp(identification: string, code: number): Promise<boolean> {
    const otp: Otp = await this.getLatestOtp(identification);
    if (!otp) {
      return false;
    } else {
      if (+otp.code === +code) {
        return true;
      } else {
        return false;
      }
    }
  }
}
