  import { IsString, IsUUID, IsArray, ValidateNested, IsDate, IsEnum, IsOptional } from 'class-validator';
  import { Type } from 'class-transformer';
  import { CreateJobsDto } from '@/modules/jobs/dtos/create-jobs.dto';
  import { JobStatusEnum } from '@/constants/enums/JobStatusEnum';

  export class CreateTicketDto {
    @IsString()
    enterTime: Date;

    @IsString()
    exitTime: Date;

    @IsString()
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
    @IsOptional()
    jobs: CreateJobsDto[];

    @IsString()
    @IsEnum(JobStatusEnum)
    @IsOptional()
    status: JobStatusEnum;
  }