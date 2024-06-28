import { PartialType } from '@nestjs/mapped-types';
import { CreateTimesheetDto } from '@/modules/staff/dto/create-timesheet.dto';

export class UpdateTimesheetDto  extends PartialType(CreateTimesheetDto) {}
