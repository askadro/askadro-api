import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { CreateJobsDto } from './dtos/create-jobs.dto';
import { JobsService } from './jobs.service';
import { Job } from './job.entity';
import { path } from '@/constants/paths';
import { UpdateJobDto } from '@/modules/jobs/dtos/update-jobs.dto';

@Controller(path.job.main)
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post(path.job.create)
  createJob(@Body() body: CreateJobsDto): Promise<Job> {
    return this.jobsService.create(body);
  }

  @Get(path.job.getOneJob)
  async getJob(@Param('id') id: string): Promise<Job> {
    const job = await this.jobsService.findOne(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  @Get(path.job.getJobs)
  getJobs(): Promise<Job[]> {
    return this.jobsService.find();
  }

  @Patch(path.job.updateJob)
  updateJob(@Param('id') id: string, @Body() body: UpdateJobDto) {
    return this.jobsService.update(id, body);
  }

  @Delete(path.job.deleteJob)
  deleteJob(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }

  @Post(path.job.filterJob)
  filterJob(@Body() body:Partial<Job>){
    return this.jobsService.filter(body)
  }

  // @Post('/search')
  // async geJobsWithEmail(@Body() body: { company: string }) {
  //   return this.jobsService.find(body);
  // }
}
