import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJobsDto } from './dtos/create-jobs.dto';
import { Job } from './job.entity';
import { UpdateJobDto } from './dtos/update-jobs.dto';

@Injectable()
export class JobsService {
  constructor(@InjectRepository(Job) private repo: Repository<Job>) {}

  async create(body: CreateJobsDto) {
    const job = this.repo.create({
      company: body.company,
      user: body.user,
      startTime: body.startTime,
      endTime: body.endTime,
      extraTime: body.extraTime,
    });
    return await this.repo.save(job);
  }

  async findOne(id: string) {
    const job = await this.repo.findOne({
      where: { id },
      relations: { user: true, company: true },
    });
    if (job) {
      return job;
    }
    throw new NotFoundException();
  }

  async find() {
    return await this.repo.find({
      select: {
        user: {
          firstName: true,
          lastName: true,
          Identity: true,
          id: true,
        },
        company: {
          id: true,
          name: true,
        },
      },
      relations: {
        company: true,
        user: true,
      },
    });
  }

  async update(id: string, attrs: UpdateJobDto) {
    const job = await this.findOne(id);
    if (!job) {
      throw new Error('Job not found');
    }
    Object.assign(job, attrs);
    return this.repo.save(job);
  }

  async remove(id: string) {
    const job = await this.findOne(id);
    if (!job) {
      throw new NotFoundException();
    }
    return this.repo.remove(job);
  }

  async filter(body: UpdateJobDto) {
    const filteredJobs = await this.repo.find({
      where: {
        user: body.user,
        company: body.company,
        startTime: body.startTime,
        endTime: body.endTime,
      },
    });
    return filteredJobs;
  }
}
