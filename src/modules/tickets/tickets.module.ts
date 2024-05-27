import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '@/modules/jobs/job.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { CommonService } from '@/modules/common/common.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket,Job,User,Company])],
  controllers: [TicketsController],
  providers: [TicketsService,CommonService],
  exports:[TicketsService],
})
export class TicketsModule {
}
