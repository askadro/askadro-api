import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JobsRepository } from './jobs.repository';
import { CreateJobsDto } from './dtos/create-jobs.dto';
import { Job } from './job.entity';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private repo: Repository<Job>,
    @InjectRepository(Company) private cmp: Repository<Company>,
  ) {}

  async create(body: CreateJobsDto) {
    console.log(body);
    const job = this.repo.create({
      company: body.company,
      user: body.user,
      startTime: body.startTime,
      endTime: body.endTime,
    });
    return await this.repo.save(job);
  }

  async findOne(id: string) {
    const auths = await this.repo.findOne({
      where: { id },
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
      relations: { user: true, company: true },
    });
    if (auths) {
      return auths;
    }
    throw new NotFoundException();
  }

  // find(body) {
  //   return this.repo.findBy(body);
  // }

  // findAll() {
  //   return this.repo.find();
  // }

  // async update(id: string, attrs: Partial<Job>) {
  //   const job = await this.findOne(id);
  //   if (!job) {
  //     throw new Error('Job not found');
  //   }
  //   Object.assign(job, attrs);
  //   return this.repo.save(job);
  // }

  // delete(id: string) {
  //   return this.repo
  //     .createQueryBuilder()
  //     .delete()
  //     .from(Job)
  //     .where('id = :id', { id })
  //     .execute();
  // }
}
