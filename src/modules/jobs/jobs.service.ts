import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJobsDto } from './dtos/create-jobs.dto';
import { Job } from './job.entity';
import { UpdateJobDto } from './dtos/update-jobs.dto';
import { UsersService } from '@/modules/users/users.service';
import { startOfMonth, startOfYear } from 'date-fns';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private jobRepository: Repository<Job>,
    private readonly usersService: UsersService) {
  }

  async create(body: CreateJobsDto) {
    const user = await this.usersService.findOne(body.staffId);
    const job = this.jobRepository.create({
      staff: user ? { id: user.id } : null,
      ...body,
    });
    return await this.jobRepository.save(job);
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException('Job not found.');
    }
    return job;
  }

  // async findOne(id: string, relations: string[] = ['users']) {
  //   const job = await this.jobRepository.findOne({
  //     ,
  //     relations: relations,
  //   });
  //   if (!job) {
  //     throw new NotFoundException();
  //   }
  //   return job;
  // }

  async find() {
    return await this.jobRepository.find();
  }

  async update(id: string, attrs: UpdateJobDto) {
    const job = await this.findOne(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    Object.assign(job, attrs);
    return this.jobRepository.save(job);
  }

  async remove(id: string) {
    const job = await this.findOne(id);
    return this.jobRepository.softRemove(job);
  }

  async addJobForTicket(body: CreateJobsDto[]) {
    if (!body) return 'no body';
    const jobEntities = body.map((job: CreateJobsDto) => this.jobRepository.create({
      ...job,
      ticket: { id: job.ticketId },
      staff: { id: job.staffId },
    }));

    if (!jobEntities) {
      throw new BadRequestException('Job not create');
    }
    return await this.jobRepository.save(jobEntities);

  }

  async filter(body: UpdateJobDto) {
    return await this.jobRepository.find({
      // where: {
      //   user: body.userId,
      //   company: body.company,
      //   enterTime: body.enterTime,
      //   exitTime: body.exitTime,
      // },
    });
  }

  async counts() {
    const today = new Date();
    const firstDayOfCurrentMonth = startOfMonth(today);
    const firstDayCurrentYear = startOfYear(today);
    const oneMountJobs = await this.jobRepository.count({
      where: {
        createdAt: Between(firstDayOfCurrentMonth, today),
      },
    });
    const oneYearJobs = await this.jobRepository.count({
      where: {
        createdAt: Between(firstDayCurrentYear, today),
      },
    });
    const allJobs = await this.jobRepository.count({});

    return { oneMountJobs, oneYearJobs, allJobs };
  }
}
