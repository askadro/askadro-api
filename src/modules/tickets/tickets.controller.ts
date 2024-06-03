import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { path } from '@/constants/paths';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from '@/modules/tickets/dtos/update-ticket.dto';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { TicketDto } from '@/modules/tickets/dtos/ticket.dto';

@Serialize(TicketDto)
@Controller('tickets')
export class TicketsController {
  constructor(private ticketService: TicketsService) {
  }

  @Post('new')
  createTicket(@Body() body: CreateTicketDto) {
    return this.ticketService.create(body);
  }

  @Get('/with-job')
  getTicketWithRelation() {
    return this.ticketService.getTicketsWithRelation();
  }

  @Get('/only-ticket')
  getTickets() {
    return this.ticketService.getTickets();
  }

  @Get('/:id')
  getTicket(@Param('id') id: string) {
    return this.ticketService.getTicket(id);
  }

  @Patch('/update/:id')
  updateTicket(@Param('id') id: string, @Body() body: UpdateTicketDto) {
    return this.ticketService.updateTicket(id, body);
  }
}
