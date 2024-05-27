import { IsString, IsUUID, IsArray, ValidateNested, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateJobsDto } from '@/modules/jobs/dtos/create-jobs.dto';

export class CreateTicketDto {
  @IsString()
  enterTime: string;

  @IsString()
  exitTime: string;

  @IsString()
  @IsDate()
  ticketDate: Date;

  @IsString()
  ticketNotes: string;

  @IsUUID()
  @IsString()
  userId: string;

  @IsUUID()
  @IsString()
  companyId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJobsDto)
  jobs: CreateJobsDto[];
}