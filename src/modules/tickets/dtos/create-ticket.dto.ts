import {
  IsNumber,

  IsString,
} from 'class-validator';
import { User } from '@/modules/users/entities/user.entity';

export class CreateTicketDto {
  @IsString()
  creator: User;

  @IsNumber()
  waiter: number;

  @IsNumber()
  cleaner: number;

  @IsNumber()
  hostess: number;

  @IsNumber()
  chef: number;
}
