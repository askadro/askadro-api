import {
  IsOptional,
  IsString, IsUUID,
} from 'class-validator';
import { Company } from '../../company/entities/company.entity';
import { User } from '../../users/entities/user.entity';

export class CreateJobsDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  ticketId:string

  @IsString()
  enterTime: Date;

  @IsString()
  exitTime: Date;

  @IsString()
  @IsOptional()
  extraTime: string;

  @IsOptional()
  @IsString()
  extraPrice: string;

  @IsOptional()
  @IsString()
  title:string

}
