import { IsNotEmpty, IsDateString, IsNumber, IsUUID, IsString } from 'class-validator';

export class CreateTimesheetDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  staffId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  companyId: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNumber()
  hoursWorked: number;
}
