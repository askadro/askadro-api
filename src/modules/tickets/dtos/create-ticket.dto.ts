  import { IsString, IsUUID, IsArray, ValidateNested, IsDate, IsEnum, IsOptional } from 'class-validator';
  import { Type } from 'class-transformer';
  import { CreateJobsDto } from '@/modules/jobs/dtos/create-jobs.dto';
  import { JobStatusEnum } from '@/enums/JobStatusEnum';

  export class CreateTicketDto {
    @IsString()
    enterTime: string;

    @IsString()
    exitTime: string;

    @IsString()
    ticketDate: string;

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

    @IsString()
    @IsEnum(JobStatusEnum)
    @IsOptional()
    status: JobStatusEnum;
  }