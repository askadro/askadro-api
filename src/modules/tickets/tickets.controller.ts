import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { path } from '@/constants/paths';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from '@/modules/tickets/dtos/update-ticket.dto';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { TicketDto } from '@/modules/tickets/dtos/ticket.dto';
import { SendEmailDto } from '@/modules/as-mailer/dto/send-email.dto';
import { AsMailerService } from '@/modules/as-mailer/as-mailer.service';
import { CompanyService } from '@/modules/company/company.service';
import { Job } from '@/modules/jobs/job.entity';
import { ConfigService } from '@nestjs/config';
import { Roles } from 'nest-keycloak-connect';

@Roles({ roles: ['user', 'owner', 'chef'] })
@Serialize(TicketDto)
@Controller('tickets')
export class TicketsController {
  constructor(private ticketService: TicketsService,
              private readonly asMailerService: AsMailerService,
              private readonly companyService: CompanyService,
              private readonly configService: ConfigService,
  ) {
  }

  @Post('new')
  createTicket(@Body() body: CreateTicketDto) {
    return this.ticketService.create(body);
  }

  @Get('/with-job')
  getTicketWithRelation() {
    return this.ticketService.getTicketsWithRelation();
  }

  @Post('/only-ticket')
  getTickets(@Body() body: { startDate: Date, endDate: Date }) {
    return this.ticketService.getTicketsByDateRange(body);
  }

  @Get('/:id')
  getTicket(@Param('id') id: string) {
    return this.ticketService.getTicket(id);
  }

  @Delete('delete/:id')
  deleteTicket(@Param('id') id: string) {
    return this.ticketService.deleteTicket(id);
  }

  @Patch('/update/:id')
  updateTicket(@Param('id') id: string, @Body() body: UpdateTicketDto) {
    return this.ticketService.updateTicket(id, body);
  }

  @Post('/send-email/:id')
  async sendEmail(@Param('id') id: string, @Body() body: SendEmailDto): Promise<any> {
    const ticket = await this.ticketService.getTicket(id);
    const company = await this.companyService.findOne(ticket.company.id);
    const personel = ticket.jobs?.map((u: Job) => ({
      firstName: u.staff.firstName,
      lastName: u.staff.lastName,
      birthDate: new Date(u.staff.birthDate),
      identity: u.staff.identity,
      phone: u.staff.phone,
      title: u.title,
      id: u.staff.id,
    }));

    return this.asMailerService.sendEmailForTicket({
      ...body,
      recipients: [company.email, ...body.recipients],
      subject: body.subject || this.configService.get('MAIL_SUBJECT'),
      text: body.text || 'Selam',
      sender: body.sender ?? {
        name: this.configService.get('MAIL_FROM_NAME'),
        address: this.configService.get('MAIL_FROM_ADDRESS'),
      },
      personel,
    });
  }
}


