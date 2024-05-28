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
  @IsOptional()
  companyId: string;

  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  enterTime: string; // 00:00 formatında girilecek

  @IsString()
  exitTime: string; // 00:00 formatında girilecek

  @IsOptional()
  extraTime: string;
}
