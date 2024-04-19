import {
  IsArray,
  IsEnum,
  IsMobilePhone,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Authorized } from '../entities/authorized.entity';
import { Cities } from '@/enums/cities';

export class CreateCompanyDto {
  @IsString()
  @MaxLength(100, {
    message:
      'Name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  @MinLength(3, {
    message:
      'Name is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  name: string;

  @IsString()
  @IsMobilePhone('tr-TR')
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

  @IsArray()
  authorized: Authorized[];

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
