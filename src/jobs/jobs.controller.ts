import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobsDto } from './dtos/create-jobs.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  getJobs() {
    return this.jobsService.findAll();
  }

  @Get('/:id')
  async getJob(@Param('id') id: string) {
    const job = await this.jobsService.findOne(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  @Post('/search')
  async geJobsWithEmail(@Body() body: { company: string }) {
    return this.jobsService.find(body.company);
  }

  @Post('/new')
  createJob(@Body() body: CreateJobsDto) {
    return this.jobsService.create(body.company, body.user, body.time);
  }

  @Delete('/delete/:id')
  deleteJob(@Param('id') id: string) {
    return this.jobsService.delete(id);
  }

  @Post('/update/:id')
  updateJob(id: string) {}
}


