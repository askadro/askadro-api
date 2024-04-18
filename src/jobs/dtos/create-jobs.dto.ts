import {
  IsArray,
  IsEmail,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Company } from 'src/company/entities/company.entity';

export class CreateJobsDto {
  @IsString()
  company: string;

  @IsString()
  user: string;

  @IsString()
  startTime: string; // 00:00 formatında girilecek

  @IsString()
  endTime: string; // 00:00 formatında girilecek
}
