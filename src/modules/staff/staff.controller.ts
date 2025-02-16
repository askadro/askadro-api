import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from '@/modules/staff/entities/staff.entity';
import { Timesheet } from '@/modules/staff/entities/timesheet.entity';
import { CreateTimesheetDto } from '@/modules/staff/dto/create-timesheet.dto';
import { UpdateTimesheetDto } from '@/modules/staff/dto/update-timesheet.dto';
import { SearchStaffDto } from '@/modules/staff/dto/searc-staff.dto';
import { GetTimesheetsDto } from '@/modules/staff/dto/get-timesheet.dto';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';

@Resource(Staff.name)
@Roles({roles:["user","owner"]})
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {
  }

  @Post('new')
  async createStaff(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Put('update/:id')
  async updateStaff(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(id, updateStaffDto);
  }

  @Delete('delete/:id')
  async deleteStaff(@Param('id') id: string, @Body() soft: string) {
    return this.staffService.remove(id, soft);
  }

  @Post('search')
  async searchStaff(@Body() searchStaffDto: SearchStaffDto): Promise<Staff[]> {
    return this.staffService.searchStaff(searchStaffDto);
  }

  @Roles({ roles: ['user'] })
  @Get('all')
  findAll(): Promise<[Staff[], number]> {
    return this.staffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Staff> {
    return this.staffService.findOne(id, ['job', 'timesheets']);
  }

  @Roles({ roles: ['owner'] })
  @Post('add/timesheet')
  createTimesheet(
    @Body() createTimesheetDto: CreateTimesheetDto,
  ): Promise<Timesheet> {
    return this.staffService.createTimesheet(createTimesheetDto);
  }

  @Roles({ roles: ['owner'] })
  @Put('update/timesheet/:id')
  updateTimesheet(
    @Param('id') id: string,
    @Body() updateTimesheetDto: UpdateTimesheetDto,
  ): Promise<Timesheet> {
    return this.staffService.updateTimesheet(id, updateTimesheetDto);
  }

  @Roles({ roles: ['owner'] })
  @Delete('delete/timesheet/:id')
  deleteTimesheet(@Param('id') id: string) {
    return this.staffService.deleteTimesheet(id);
  }

  @Roles({ roles: ['owner'] })
  @Post('timesheets')
  async getTimesheetsByCompanyAndMonth(@Body() getTimesheetsDto: GetTimesheetsDto): Promise<any> {
    return this.staffService.getTimesheetsByCompanyAndDate(getTimesheetsDto);
  }

  @Roles({ roles: ['owner'] })
  @Post('/multi-staff')
  fetchStaffsWithIds(@Body() body: { ids: string[] }) {
    return this.staffService.fetchTicketsWithIds(body.ids);
  }
}
