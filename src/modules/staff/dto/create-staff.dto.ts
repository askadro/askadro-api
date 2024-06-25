import { IsString, IsEnum, IsUUID, IsOptional, IsArray, Length, IsDateString, IsNotEmpty } from 'class-validator';
import { userGenderEnum } from '@/constants/enums/user.gender.enum';
import { StaffStatusEnum } from '@/constants/enums/staffStatusEnum';
import { TITLES } from '@/constants/enums/titles';
import { Job } from '@/modules/jobs/job.entity';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { Address } from '@/modules/addresses/entities/address.entity';
import { AddressStatusEnum } from '@/modules/addresses/enums/address.status.enum';

export class CreateStaffDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsArray()
  @IsOptional()
  job?: Job[];

  @IsArray()
  @IsOptional()
  ticket?: Ticket[];

  @IsOptional()
  address?: Address;

  @IsString()
  @Length(11, 11)
  identity: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  iban?: string;

  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @IsEnum(userGenderEnum)
  gender: userGenderEnum;

  @IsArray()
  @IsEnum(TITLES, { each: true })
  @IsOptional()
  titles?: TITLES[];

  @IsEnum(StaffStatusEnum)
  @IsOptional()
  status?: StaffStatusEnum;

  @IsOptional()
  @IsNotEmpty({ message: 'Şehir bilgisi giriniz' })
  @IsUUID()
  provinceId?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Semt bilgisi giriniz' })
  @IsUUID()
  districtId?: string;

  @IsOptional()
  @IsString()
  addressDetail?: string;

  @IsOptional()
  @IsEnum(AddressStatusEnum)
  addressStatus?: AddressStatusEnum;
}
