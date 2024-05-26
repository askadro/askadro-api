import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { CreateTicketDto } from '@/modules/tickets/dtos/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(@InjectRepository(Ticket) private repo: Repository<Ticket>) {}


  async create(body: CreateTicketDto) {

  }
}
