import {
  IsEmail, IsEnum,
  IsMobilePhone, IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString, IsUUID,
  Length,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from '@/modules/addresses/dto/create-address.dto';
import { CreateAuthorizedDto } from '@/modules/company/dtos/create-authorized.dto';
import { Type } from 'class-transformer';
import { AddressStatusEnum } from '@/modules/addresses/enums/address.status.enum';

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
  @IsEmail()
  email: string;

  @IsNumberString()
  registrationNumber: string;// sicil numarası

  @IsString()
  @Length(1, 2)
  timeOfPayment: string; // ayın ödeme gününü temsil eder

  @IsNumberString()
  totalWorkingTime: string;

  @IsNotEmpty()
  @IsUUID()
  provinceId: string;

  @IsNotEmpty()
  @IsUUID()
  districtId: string;

  @IsOptional()
  @IsString()
  addressDetail?: string;

  @IsOptional()
  @IsEnum(AddressStatusEnum)
  addressStatus?: AddressStatusEnum;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAuthorizedDto)
  authorized?:CreateAuthorizedDto[]
}
