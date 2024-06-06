import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '@/modules/addresses/entities/address.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';
import { CommonService } from '@/modules/common/common.service';
import { Job } from '@/modules/jobs/job.entity';
import { Ticket } from '@/modules/tickets/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address, User, Company, Province, District,Job,Ticket]),
  ],
  controllers: [AddressesController],
  providers: [AddressesService,CommonService],
  exports: [AddressesService],
})
export class AddressesModule {}
