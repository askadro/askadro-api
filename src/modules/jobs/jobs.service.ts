import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const user = await this.usersService.findOne(body.staffId);
    const job = this.repo.create({
      staff: user ? { id: user.id } : null,
      ...body,
    });
    return await this.repo.save(job);
  }

  async findOne(id: string, relations: string[] = ['users']) {
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
    return await this.repo.find();
  }

  async update(id: string, attrs: UpdateJobDto) {
    const job = await this.findOne(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    Object.assign(job, attrs);
    return this.repo.save(job);
  }

  async remove(id: string) {
    const job = await this.repo.findOne({
      where: { id },
    });
    console.log(job);
    if (!job) {
      throw new NotFoundException();
    }
    return this.repo.softRemove(job);
  }

  async addJobForTicket(body: CreateJobsDto[]) {
    console.log(body);
    if (!body) return 'no body';
    const jobs = body.map((job: CreateJobsDto) => this.repo.create({
      ...job,
      ticket: { id: job.ticketId },
      staff: { id: job.staffId },
    }));

    if (!jobs) {
      throw new BadRequestException('Job not create');
    }
    try {
      return await this.repo.save(jobs);
    } catch (error) {
      throw new BadRequestException(error);
    }
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
