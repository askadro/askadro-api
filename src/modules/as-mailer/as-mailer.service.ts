import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '@/modules/as-mailer/dto/send-email.dto';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { MAIL_TEXT } from '@/constants/mail/constants';


@Injectable()
export class AsMailerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailerService,
  ) {
  }

  async sendEmail(
    sendEmail: SendEmailDto,
    data: any[],
  ): Promise<any> {
    const { recipients, subject, text, html } = sendEmail;

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
        template: 'notification',
        context: {
          APP_NAME: this.configService.get('APP_NAME'),
          data,
        },
      });
    } catch (error) {
      throw error;

    }
  }


  async sendEmailForTicket(data: SendEmailDto) {
    const { recipients, subject, text, html, personel, sender } = data;

    const customSender: string | Address = sender ?? {
      name: this.configService.get('MAIL_FROM_NAME'),
      address: this.configService.get('MAIL_FROM_ADDRESS'),
    };

    try {
      return await this.mailService.sendMail({
        from: customSender,
        to: recipients.join(','),  // Recipients should be joined as a comma-separated string
        subject,
        text,
        html,
        template: 'notification',
        context: {
          APP_NAME: this.configService.get('APP_NAME'),
          personel,
          text: text || MAIL_TEXT,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
