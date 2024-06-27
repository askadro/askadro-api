import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class GetTimesheetsDto {
  @IsNotEmpty()
  @IsString()
  companyId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(2015)
  @Max(2050)
  year:number
}