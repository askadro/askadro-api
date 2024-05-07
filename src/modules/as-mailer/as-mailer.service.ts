import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '@/modules/as-mailer/dto/send-email.dto';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AsMailerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailerService,
  ) {
  }

  async sendEmail(
    sendEmail: SendEmailDto,
  ): Promise<any> {
    const { recipients, subject, text, html } = sendEmail;

    // if (!sender) {
    //   throw new Error('Sender not found');
    // }
    //
    // if (!recipients) {
    //   throw new Error('Recipients not found');
    // }
    //
    // if (!subject) {
    //   throw new Error('Subject not found');
    // }
    //
    // if (!text && !html) {
    //   throw new Error('Text or html not found');
    // }

    const sender: string | Address = sendEmail.sender ?? {
      name: this.configService.get('MAIL_FROM_NAME'),
      address: this.configService.get('MAIL_FROM_ADDRESS'),
    };

    try {
      return await this.mailService.sendMail({
        from: sender,
        to: recipients,
        subject,
        text,
        html,
      });
    } catch (error) {
      throw error;

    }
  }
}
