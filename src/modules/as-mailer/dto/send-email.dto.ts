import { IsNotEmpty, IsOptional } from 'class-validator';
import { Address, AttachmentLikeObject } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';


export class SendEmailDto {

  @IsNotEmpty(
    {
      message: 'Sender not found',
    },
  )
  @IsOptional()
  sender?: Address;

  @IsNotEmpty(
    {
      message: 'Recipients not found',
    },
  )
  recipients: Address[];

  @IsNotEmpty(
    {
      message: 'Subject not found',
    },
  )
  subject: string;

  @IsNotEmpty(
    {
      message: 'Text or html not found',
    },
  )
  text: string;

  @IsNotEmpty(
    {
      message: 'Text or html not found',
    },
  )
  html?: string;

  @IsNotEmpty(
    {
      message: 'Attachments not found',
    },
  )
  @IsOptional()
  attachments?: AttachmentLikeObject[];

}
