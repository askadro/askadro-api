import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from '@/modules/staff/entities/staff.entity';
import { Timesheet } from '@/modules/staff/entities/timesheet.entity';
import { Company } from '@/modules/company/entities/company.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Staff,Timesheet,Company])],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
