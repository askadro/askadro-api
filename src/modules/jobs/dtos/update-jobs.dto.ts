import { PartialType } from '@nestjs/mapped-types';
import { CreateJobsDto } from './create-jobs.dto';

export class UpdateJobDto extends PartialType(CreateJobsDto) {}
