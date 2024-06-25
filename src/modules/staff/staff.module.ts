import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from '@/modules/staff/entities/staff.entity';
import { Timesheet } from '@/modules/staff/entities/timesheet.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { Address } from '@/modules/addresses/entities/address.entity';
import { AddressesModule } from '@/modules/addresses/addresses.module';
import { CompanyModule } from '@/modules/company/company.module';
import { CompanyService } from '@/modules/company/company.service';
import { Authorized } from '@/modules/company/entities/authorized.entity';
import { AddressesService } from '@/modules/addresses/addresses.service';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Staff,Timesheet,Company,Address,Authorized,Province,District]),AddressesModule],
  controllers: [StaffController],
  providers: [StaffService,CompanyService,AddressesService],
})
export class StaffModule {}
