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
  enterTime: Date; // 00:00 formatında girilecek

  @IsString()
  exitTime: Date; // 00:00 formatında girilecek

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
