import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from '@/modules/tickets/dtos/create-ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {}
