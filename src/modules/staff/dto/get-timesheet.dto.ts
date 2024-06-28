import { IsNotEmpty, IsString, IsNumber, Min, Max, IsDateString } from 'class-validator';

export class GetTimesheetsDto {
  @IsNotEmpty()
  @IsString()
  companyId: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

}