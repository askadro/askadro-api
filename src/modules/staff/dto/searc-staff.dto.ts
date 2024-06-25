import { IsNotEmpty, IsString } from 'class-validator';

export class SearchStaffDto {
  @IsNotEmpty()
  @IsString()
  query: string;
}