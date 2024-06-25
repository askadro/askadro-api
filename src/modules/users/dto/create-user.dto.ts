import { AddressStatusEnum } from '@/modules/addresses/enums/address.status.enum';
import { IsString, IsEmail, IsEnum, IsUUID, IsOptional, Length, IsDateString, IsNotEmpty } from 'class-validator';
import { userGenderEnum } from '@/constants/enums/user.gender.enum';
import { ROLES } from '@/constants/enums/roles';
import { UserStatusEnum } from '@/constants/enums/userStatusEnum';

export class CreateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  salt?: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;

  @IsDateString()
  @IsOptional()
  refreshTokenExpiryTime?: Date;

  @IsEnum(ROLES)
  roles: ROLES;

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

  @IsEnum(UserStatusEnum)
  @IsOptional()
  status?: UserStatusEnum;
}
