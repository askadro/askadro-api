import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateTimesheetDto {
  @IsNotEmpty()
  @IsNumber()
  staffId: string;

  @IsNotEmpty()
  @IsNumber()
  companyId: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNumber()
  hoursWorked: number;
}
