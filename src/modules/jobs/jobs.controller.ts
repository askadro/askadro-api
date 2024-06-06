import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  NotFoundException,
  Patch, Req, UseGuards,
} from '@nestjs/common';
import { CreateJobsDto } from './dtos/create-jobs.dto';
import { JobsService } from './jobs.service';
import { Job } from './job.entity';
import { path } from '@/constants/paths';
import { UpdateJobDto } from '@/modules/jobs/dtos/update-jobs.dto';
import { JwtAuthGuard } from '@/modules/auth/quards/jwt-auth-guard';
import { RolesGuard } from '@/modules/auth/quards/roles.guard';
import { TITLES } from '@/constants/enums/titles';
import { Roles } from '@/modules/auth/roles.decorator';
import { ROLES } from '@/constants/enums/roles';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {
  }

  @Roles(ROLES.manager)
  @Post('new')
  createJob(@Body() body: CreateJobsDto): Promise<Job> {
    return this.jobsService.create(body);
  }

  @Roles(ROLES.manager)
  @Patch('/update/:id')
  updateJob(@Param('id') id: string, @Body() body: UpdateJobDto) {
    return this.jobsService.update(id, body);
  }

  @Roles(ROLES.manager)
  @Get('/:id')
  async getJob(@Param('id') id: string): Promise<Job> {
    const job = await this.jobsService.findOne(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  @Roles(ROLES.manager)
  @Get()
  getJobs(): Promise<Job[]> {
    return this.jobsService.find();
  }

  @Roles(ROLES.manager)
  @Delete('delete/:id')
  deleteJob(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }

  @Roles(ROLES.manager)
  @Post('/filter/all')
  filterJob(@Body() body: Partial<Job>) {
    return this.jobsService.filter(body);
  }

  @Roles(ROLES.manager)
  @Post('/new/ticket')
  addJobForTicket(@Body() body:CreateJobsDto[]) {
    return this.jobsService.addJobForTicket(body);
  }

  // @Post('/search')
  // async geJobsWithEmail(@Body() body: { company: string }) {
  //   return this.jobsService.find(body);
  // }
}
