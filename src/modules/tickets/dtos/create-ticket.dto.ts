import {
  IsArray,
  IsDate,
  IsNumber,

  IsString,
} from 'class-validator';
import { User } from '@/modules/users/entities/user.entity';

export class CreateTicketDto {
  @IsString()
  userId:User

  @IsString()
  companyId:string

  @IsDate()
  enterHour:Date

  @IsArray()
  staffs:User[]

  @IsDate()
  exitHour:Date

  @IsDate()
  ticketDate:Date

  @IsString()
  ticket_notes:string

}
