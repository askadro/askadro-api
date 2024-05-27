import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { CreateTicketDto } from '@/modules/tickets/dtos/create-ticket.dto';
import { Job } from '@/modules/jobs/job.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { CommonService } from '@/modules/common/common.service';
import { UpdateTicketDto } from '@/modules/tickets/dtos/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly commonService: CommonService,
  ) {
  }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { userId, companyId, jobs, ...ticketData } = createTicketDto;

    const { user, company } = await this.commonService.findUserOrCompany(userId, companyId);

    const ticket = new Ticket();
    Object.assign(ticket, ticketData);
    ticket.user = user;
    ticket.company = company;

    const savedTicket = await this.ticketRepository.save(ticket);

    const jobEntities = jobs.map(jobData => {
      const job = new Job();
      Object.assign(job, jobData);
      job.ticket = savedTicket;
      job.user = user;
      job.company = company;
      return job;
    });
    await this.jobRepository.save(jobEntities);

    return this.ticketRepository.findOne({
      where: { id: savedTicket.id },
      relations: ['jobs', 'company', 'user'],
    });
  }

  async getTicket(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ where: { id }, relations: ['user', 'company', 'jobs'] });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found 58`);
    }
    return ticket;
  }

  async getTickets(): Promise<Ticket[]> {
    return this.ticketRepository.find({ relations: ['user', 'company', 'jobs'] });
  }

  async updateTicket(id: string, body: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.getTicket(id);
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found 25`);
    }
    const { userId, companyId, jobs, ticketDate, ticketNotes, exitTime, enterTime } = body;

    if (userId || companyId) {
      const { user, company } = await this.commonService.findUserOrCompany(userId, companyId);
      if (user) ticket.user = user;
      if (company) ticket.company = company;
    }

    if (ticketNotes) ticket.ticketNotes = ticketNotes;
    if (exitTime) ticket.exitTime = exitTime;
    if (enterTime) ticket.enterTime = enterTime;
    if (ticketDate) ticket.ticketDate = ticketDate;

    if (jobs) {
      // Assuming you want to replace all existing jobs with the new ones
      ticket.jobs = [];
      for (const jobData of jobs) {
        const job = new Job();
        Object.assign(job, jobData);
        job.ticket = ticket;
        ticket.jobs.push(job);
      }
    }

    return await this.jobRepository.save(ticket);
  }
}
