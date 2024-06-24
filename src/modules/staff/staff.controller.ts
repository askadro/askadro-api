import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from '@/modules/staff/entities/staff.entity';
import { Timesheet } from '@/modules/staff/entities/timesheet.entity';
import { CreateTimesheetDto } from '@/modules/staff/dto/create-timesheet.dto';
import { UpdateTimesheetDto } from '@/modules/staff/dto/update-timesheet.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {
  }

  @Post()
  async createStaff(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Put(':id')
  async updateStaff(@Param('id') id: string, @Body() updateStaffDto: CreateStaffDto) {
    return this.staffService.update(id, updateStaffDto);
  }

  @Get()
  findAll(): Promise<Staff[]> {
    return this.staffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Staff> {
    return this.staffService.findOne(id);
  }

  @Post(':id/timesheet')
  createTimesheet(
    @Param('id') id: string,
    @Body() createTimesheetDto: CreateTimesheetDto,
  ): Promise<Timesheet> {
    return this.staffService.createTimesheet(id, createTimesheetDto);
  }

  @Put('timesheet/:id')
  updateTimesheet(
    @Param('id') id: string,
    @Body() updateTimesheetDto: UpdateTimesheetDto,
  ): Promise<Timesheet> {
    return this.staffService.updateTimesheet(id, updateTimesheetDto);
  }

}
