import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, SendMailOptions } from 'nodemailer';
@Injectable()
export class MailsService {
  constructor(private readonly configService: ConfigService) {}
  private transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: this.configService.getOrThrow('EMAIL_SENDER'),
      pass: this.configService.getOrThrow('APP_PASSWORD'),
    },
  });

  async sendMagicLink(to: string, link: string) {
    let emailStructure = {
      from: this.configService.getOrThrow('EMAIL_SENDER'),
      to,
      html: `<a href=${link}>login</a>`,
    } satisfies SendMailOptions;

    await this.transporter.sendMail(emailStructure);
  }
}
