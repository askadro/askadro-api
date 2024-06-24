import { IsString, IsEnum, IsUUID, IsOptional, IsArray, Length, IsDateString } from 'class-validator';
import { userGenderEnum } from '@/modules/users/enums/user.gender.enum';
import { UserStatusEnum } from '@/modules/users/enums/user.status.enum';
import { TITLES } from '@/constants/enums/titles';
import { Job } from '@/modules/jobs/job.entity';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { Address } from '@/modules/addresses/entities/address.entity';

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

  @IsEnum(UserStatusEnum)
  @IsOptional()
  status?: UserStatusEnum;
}
