import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { CreateTicketDto } from '@/modules/tickets/dtos/create-ticket.dto';
import { Job } from '@/modules/jobs/job.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { CommonService } from '@/modules/common/common.service';
import { UpdateTicketDto } from '@/modules/tickets/dtos/update-ticket.dto';
import { JobsService } from '@/modules/jobs/jobs.service';

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
    private readonly jobsService: JobsService,
  ) {
  }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { userId, companyId, jobs, ...ticketData } = createTicketDto;

    if (!userId) {
      throw new NotFoundException('User is required');
    }

    if (!companyId) {
      throw new NotFoundException('CompanyId is required');
    }

    const createdTicket = await this.ticketRepository.save({
      ...ticketData,
      user: { id: userId },
      company: { id: companyId },
    });

    const savedTicket = await this.ticketRepository.save(createdTicket);

    const jobEntities = jobs.map(jobData => {
      return this.jobRepository.create({
        ...jobData,
        users: { id: jobData.userId },
        ticket: { id: savedTicket.id },
      });
    });
    const savedJobs = await this.jobRepository.save(jobEntities);

    if (!savedJobs) {
      throw new BadRequestException('Jobs can not create');
    }

    return savedTicket;
  }

  async getTicket(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['user', 'company', 'jobs', 'jobs.users'],
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return ticket;
  }

  async getTickets(): Promise<Ticket[]> {
    return await this.ticketRepository.find({ relations: ['user', 'company'] });
  }

  async getTicketsWithRelation(): Promise<Ticket[]> {
    return this.ticketRepository.find({ relations: ['user', 'company', 'jobs'] });
  }

  async updateTicket(id: string, body: UpdateTicketDto): Promise<Ticket> {
    if (!body) {
      throw new BadRequestException(`Request body is missing`);
    }
    const ticket = await this.getTicket(id);
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found 25`);
    }

    const { userId, companyId } = body;
    Object.assign(ticket, body);
    return await this.ticketRepository.save({
      ...ticket,
      user: { id: userId },
      company: { id: companyId },
    });
  }
}
