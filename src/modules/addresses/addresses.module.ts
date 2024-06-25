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
import { Staff } from '@/modules/staff/entities/staff.entity';
import { UsersService } from '@/modules/users/users.service';
import { CompanyService } from '@/modules/company/company.service';
import { StaffService } from '@/modules/staff/staff.service';
import { ProvincesModule } from '@/modules/provinces/provinces.module';
import { ProvincesService } from '@/modules/provinces/provinces.service';
import { CommonModule } from '@/modules/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address, Province, District])
  ],
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [AddressesService],
})
export class AddressesModule {
}
