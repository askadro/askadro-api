import { IsNotEmpty, IsOptional } from 'class-validator';
import { Address, AttachmentLikeObject } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';


export class SendEmailDto {

  @IsOptional()
  sender?: Address;

  @IsOptional()
  recipients?: string[];

  @IsOptional()
  subject?: string;

  @IsOptional()
  text?: string;

  @IsOptional()
  html?: string;

  @IsOptional()
  @IsOptional()
  attachments?: AttachmentLikeObject[];

  @IsOptional()
  @IsNotEmpty()
  personel?: {
    firstName: string;
    lastName: string;
    birthDate: Date;
    identity: string;
    phone: string;
    title:string,
    id:string
  }[];

}
