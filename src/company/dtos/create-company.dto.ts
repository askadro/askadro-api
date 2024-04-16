import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Authorized } from '../entities/authorized.entity';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  shortName: string;

  @IsString()
  city: string;

  @IsString()
  location: string; // semt

  @IsArray() // Ensure authorized is an array
  authorized: Authorized[]; // Array of authorized objects

  @IsString()
  registrationNumber: string; // sicil numarası

  @IsString()
  password: string;

  @IsString()
  timeOfPayment: string;
}
