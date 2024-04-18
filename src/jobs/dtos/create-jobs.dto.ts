import {
  IsArray,
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Company } from 'src/company/entities/company.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateJobsDto {
  @IsString()
  company: Company;

  @IsString()
  user: User;

  @IsString()
  startTime: string; // 00:00 formatında girilecek

  @IsString()
  endTime: string; // 00:00 formatında girilecek

  @IsOptional()
  extraTime: string | undefined;
}
