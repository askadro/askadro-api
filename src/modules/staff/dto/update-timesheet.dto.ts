import { IsOptional, IsNumber } from 'class-validator';

export class UpdateTimesheetDto {
  @IsOptional()
  @IsNumber()
  hoursWorked?: number;
}
