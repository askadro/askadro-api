import { IsNotEmpty, IsOptional, IsString, ValidateIf, IsUUID, IsEnum } from 'class-validator';
import { AddressStatusEnum } from '@/modules/addresses/enums/address.status.enum';

export class CreateAddressDto {
  @ValidateIf(o => !o.companyId)
  @IsNotEmpty()
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ValidateIf(o => !o.userId)
  @IsNotEmpty()
  @IsUUID()
  @IsOptional()
  companyId?: string;

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
}
