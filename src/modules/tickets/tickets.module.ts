import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '@/modules/jobs/job.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { CommonService } from '@/modules/common/common.service';
import { JobsService } from '@/modules/jobs/jobs.service';
import { UsersModule } from '@/modules/users/users.module';
import { AsMailerService } from '@/modules/as-mailer/as-mailer.service';
import { ConfigService } from '@nestjs/config';
import { CompanyModule } from '@/modules/company/company.module';
import { CompanyService } from '@/modules/company/company.service';
import { Authorized } from '@/modules/company/entities/authorized.entity';
import { AuthService } from '@/modules/auth/auth.service';
import { AddressesService } from '@/modules/addresses/addresses.service';
import { Auth } from '@/modules/auth/entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { Address } from '@/modules/addresses/entities/address.entity';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket,Job,User,Company,Authorized,Auth,Address,Province,District]),UsersModule,CompanyModule],
  controllers: [TicketsController],
  providers: [TicketsService,CommonService,
    JobsService,AsMailerService,ConfigService,CompanyService,AuthService,AddressesService,JwtService],
  exports:[TicketsService],
})
export class TicketsModule {
}
