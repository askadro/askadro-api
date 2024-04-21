import {
  IsArray,
  IsEnum,
  IsMobilePhone,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
  isEmpty,
} from 'class-validator';
import { Authorized } from '../entities/authorized.entity';
import { Cities } from 'src/enums/cities';

export class CreateCompanyDto {
  @IsString()
  @MaxLength(100, {
    // here, $constraint1 will be replaced with "50", and $value with actual supplied value
    message:
      'Name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  @MinLength(3, {
    // here, $constraint1 will be replaced with "10", and $value with actual supplied value
    message:
      'Name is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  name: string;

  @IsString()
  @IsMobilePhone("tr-TR")  // telefon numarasının tr standartlarına uygun olması validation işlemi
  phone: string;

  @IsOptional()
  @IsString()
  @Length(3)
  shortName: string | undefined;

  @IsString()
  @IsEnum(Cities)
  city: string;

  @IsString()
  location: string; // semt

  @IsArray() // Ensure authorized is an array
  authorized: Authorized[]; // Array of authorized objects

  @IsNumberString()
  registrationNumber: string;// sicil numarası

  @IsOptional()
  @IsString()
  password: string | undefined;

  @IsString()
  @Length(1, 2)
  timeOfPayment: string; // ayın ödeme gününü temsil eder

  @IsNumberString()
  totalWorkingTime: string;
}
