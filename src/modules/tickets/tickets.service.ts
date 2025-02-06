import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { CreateTicketDto } from '@/modules/tickets/dtos/create-ticket.dto';
import { Job } from '@/modules/jobs/job.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { CommonService } from '@/modules/common/common.service';
import { UpdateTicketDto } from '@/modules/tickets/dtos/update-ticket.dto';
import { JobsService } from '@/modules/jobs/jobs.service';
import { JobStatusEnum } from '@/constants/enums/JobStatusEnum';
import { startOfMonth, startOfYear } from 'date-fns';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
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
      company: { id: companyId },
      userId: userId,
    });

    const savedTicket = await this.ticketRepository.save(createdTicket);

    const jobEntities = jobs.map(jobData => {
      return this.jobRepository.create({
        ...jobData,
        staff: { id: jobData.staffId },
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
      relations: ['company', 'jobs', 'jobs.staff'],
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return ticket;
  }

  async getTicketsByDateRange(body: { startDate: Date, endDate: Date }): Promise<Ticket[]> {
    let { startDate, endDate } = body;
    if (!startDate) {
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
    }
    // Varsayılan olarak bugünün tarihini alın
    if (!endDate) {
      endDate = new Date();
    }
    return await this.ticketRepository.find({
      where: {
        status: In([JobStatusEnum.CREATING, JobStatusEnum.WAITING]),
        ticketDate: Between(startDate, endDate),
      },
      relations: ['staff', 'company'],
      order: { ticketDate: 'ASC' },
    });
  }

  async getTicketsWithRelation(): Promise<Ticket[]> {
    return this.ticketRepository.find({ relations: ['company', 'jobs'] });
  }

  async updateTicket(id: string, body: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.getTicket(id);
    const { userId, companyId } = body;
    Object.assign(ticket, body);
    return await this.ticketRepository.save({
      ...ticket,
      user: { id: userId },
      company: { id: companyId },
    });
  }

  async deleteTicket(id: string): Promise<void> {
    const ticket = await this.getTicket(id);
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    await this.ticketRepository.delete(id);
  }

  async counts() {
    const today = new Date();
    const firstDayOfCurrentMonth = startOfMonth(today);
    const ticketThisMountCount = await this.ticketRepository.count({
      where: { ticketDate: Between(firstDayOfCurrentMonth, today) },
    });
    const ticketAllTimeCount = await this.ticketRepository.count({});
    return { ticketThisMountCount, ticketAllTimeCount };
  }
}
