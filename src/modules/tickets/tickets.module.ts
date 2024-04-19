import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports:[TicketsService],
})
export class TicketsModule {
}
