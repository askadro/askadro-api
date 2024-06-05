import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { path } from '@/constants/paths';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from '@/modules/tickets/dtos/update-ticket.dto';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { TicketDto } from '@/modules/tickets/dtos/ticket.dto';
import { SendEmailDto } from '@/modules/as-mailer/dto/send-email.dto';
import { AsMailerService } from '@/modules/as-mailer/as-mailer.service';
import { CompanyService } from '@/modules/company/company.service';
import { User } from '@/modules/users/entities/user.entity';
import { Job } from '@/modules/jobs/job.entity';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_APP_NAME } from '@nestjs/schematics';

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

  @Post('/send-email/:id')
  async sendEmail(@Param('id') id: string, @Body() body: SendEmailDto): Promise<any> {
    const ticket = await this.ticketService.getTicket(id);
    const company = await this.companyService.findOne(ticket.company.id);
    const personel = ticket.jobs?.map((u: Job) => ({
      firstName: u.users.firstName,
      lastName: u.users.lastName,
      email: u.users.email,
      birthDate: new Date(u.users.birthDate),
      identity: u.users.identity,
      phone: u.users.phone,
      title: u.title,
      id: u.users.id,
    }));

    return this.asMailerService.sendEmailForTicket({
      ...body,
      recipients: [company.email,...body.recipients],
      subject: body.subject || this.configService.get("MAIL_SUBJECT"),
      text: body.text || "Selam",
      sender: body.sender ?? {
        name: this.configService.get('MAIL_FROM_NAME'),
        address: this.configService.get('MAIL_FROM_ADDRESS'),
      },
      personel,
    });
  }
}


