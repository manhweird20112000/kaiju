import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, name: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Say hi.',
        template: '/welcome',
        context: {
          name,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
