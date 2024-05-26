import { IsOptional, IsString, IsEnum, IsUUID } from 'class-validator';
import { AddressStatusEnum } from '@/modules/addresses/enums/address.status.enum';
import { Company } from '@/modules/company/entities/company.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';

export class CreateAddressDto {
  @IsOptional()
  @IsUUID()
  provinceId: Province;

  @IsOptional()
  @IsUUID()
  districtId: District;

  @IsOptional()
  @IsString()
  addressDetail: string;

  @IsEnum(AddressStatusEnum)
  addressStatus: AddressStatusEnum;

  @IsOptional()
  @IsString({
    message: 'Şirket id si olmalı',
  })
  company:Company

  @IsOptional()
  @IsString({
    message: 'User id si olmalı',
  })
  user:User

}
