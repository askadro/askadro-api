import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JobsRepository } from './jobs.repository';
import { CreateJobsDto } from './dtos/create-jobs.dto';
import { Job } from './job.entity';

@Injectable()
export class JobsService {
  constructor(@InjectRepository(Job) private repo: Repository<Job>) {}

  create(company: string, user: string, time: string) {
    const job = this.repo.create({ company, user, time });
    return this.repo.save(job);
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  find(company: string) {
    return this.repo.findBy({ company });
  }

  findAll() {
    return this.repo.find();
  }

  async update(id: string, attrs: Partial<Job>) {
    const job = await this.findOne(id);
    if (!job) {
      throw new Error('Job not found');
    }
    Object.assign(job, attrs);
    return this.repo.save(job);
  }

  delete(id: string) {
    return this.repo
      .createQueryBuilder()
      .delete()
      .from(Job)
      .where('id = :id', { id })
      .execute();
  }
}
