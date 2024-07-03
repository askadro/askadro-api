import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  NotFoundException,
  Patch
} from '@nestjs/common';
import { CreateJobsDto } from './dtos/create-jobs.dto';
import { JobsService } from './jobs.service';
import { Job } from './job.entity';
import { UpdateJobDto } from '@/modules/jobs/dtos/update-jobs.dto';
import { Roles } from 'nest-keycloak-connect';

@Roles({roles:["user"]})
@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {
  }

  @Post('new')
  createJob(@Body() body: CreateJobsDto): Promise<Job> {
    return this.jobsService.create(body);
  }

  @Patch('/update/:id')
  updateJob(@Param('id') id: string, @Body() body: UpdateJobDto) {
    return this.jobsService.update(id, body);
  }

  @Get('/:id')
  async getJob(@Param('id') id: string): Promise<Job> {
    const job = await this.jobsService.findOne(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  @Get()
  getJobs(): Promise<Job[]> {
    return this.jobsService.find();
  }

  @Delete('delete/:id')
  deleteJob(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }

  @Post('/filter/all')
  filterJob(@Body() body: Partial<Job>) {
    return this.jobsService.filter(body);
  }

  @Post('/new/ticket')
  addJobForTicket(@Body() body:CreateJobsDto[]) {
    return this.jobsService.addJobForTicket(body);
  }

  // @Post('/search')
  // async geJobsWithEmail(@Body() body: { company: string }) {
  //   return this.jobsService.find(body);
  // }
}
