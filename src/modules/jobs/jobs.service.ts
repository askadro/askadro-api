import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJobsDto } from './dtos/create-jobs.dto';
import { Job } from './job.entity';
import { UpdateJobDto } from './dtos/update-jobs.dto';
import { UsersService } from '@/modules/users/users.service';

@Injectable()
export class JobsService {
  constructor(@InjectRepository(Job) private repo: Repository<Job>,
              private readonly usersService: UsersService) {
  }

  async create(body: CreateJobsDto) {
    const user = await this.usersService.findOne(body.userId);
    const job = this.repo.create({
      users: user ? { id: user.id } : null,
      ...body,
    });
    return await this.repo.save(job);
  }

  async findOne(id: string, relations: string[] = ["users"]) {
    const job = await this.repo.findOne({
      where: { id },
      relations: relations,
    });
    if (!job) {
      throw new NotFoundException();
    }
    return job;
  }

  async find() {
    return await this.repo.find({
      relations: {
        users: true,
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
    return this.repo.softRemove(job);
  }

  async filter(body: UpdateJobDto) {
    return await this.repo.find({
      // where: {
      //   user: body.userId,
      //   company: body.company,
      //   enterTime: body.enterTime,
      //   exitTime: body.exitTime,
      // },
    });
  }
}
