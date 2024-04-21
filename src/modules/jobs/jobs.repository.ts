import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class JobsRepository {
  async findOne(id: string) {
    const contents = await readFile('jobs.json', 'utf8');
    const jobs = JSON.parse(contents);

    return jobs[id];
  }

  async findAll() {
    const contents = await readFile('jobs.json', 'utf8');
    const jobs = JSON.parse(contents);

    return jobs;
  }

  async create(content: string) {
    const contents = await readFile('jobs.json', 'utf8');
    const jobs = JSON.parse(contents);

    const id = Math.floor(Math.random() * 999);

    jobs[id] = { id, content };

    await writeFile('jobs.json', JSON.stringify(jobs));
  }
}
