import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { path } from '@/constants/paths';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from '@/modules/tickets/dtos/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketService: TicketsService) {
  }

  @Post(path.ticket.create)
  async createTicket(@Body() body: CreateTicketDto) {
    return await this.ticketService.create(body);
  }

  @Get(path.ticket.getOneTicket)
  async getTickets(@Param("id") id: string ) {
     return await this.ticketService.getTicket(id);
  }

  @Patch("/update/:id")
  updateTicket(@Param("id") id: string,@Body() body:UpdateTicketDto) {
    return this.ticketService.updateTicket(id,body)
  }

  /*
  @Post(path.company.addAuthorized)
  async createAuthorized(@Body() body: CreateAuthorizedDto[]) {
    return await this.companyService.createAuthorized(body);
  }



  @Get(path.company.getOneCompany)
  async getCompany(@Param('id') id: string) {
    return await this.companyService.findOne(id, { authorized: true });
  }

  @Patch(path.company.updateCompany)
  async updateCompany(@Body() body: UpdateCompanyDto, @Param('id') id: string) {
    return await this.companyService.update(id, body);
  }

  @Delete(path.company.deleteCompany)
  async deleteCompany(@Param('id') id: string) {
    return await this.companyService.remove(id);
  }*/
}
