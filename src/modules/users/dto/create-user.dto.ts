import {
  IsArray,
  IsByteLength,
  IsEnum,
  IsMobilePhone, IsNotEmpty,
  IsOptional,
  IsString, IsUUID,
  Length,
  ValidateNested,
} from 'class-validator';
import { userGenderEnum } from '../enums/user.gender.enum';
import { UserStatusEnum } from '../enums/user.status.enum';
import { IsUnique } from '@/utils/validations';
import { CreateAddressDto } from '@/modules/addresses/dto/create-address.dto';
import { Type } from 'class-transformer';
import { CreateAuthDto } from '@/modules/auth/dto/create-auth.dto';
import { TITLES } from '@/constants/enums/titles';
import { User } from '@/modules/users/entities/user.entity';
import { AddressStatusEnum } from '@/modules/addresses/enums/address.status.enum';

export class CreateUserDto extends CreateAuthDto {
  @IsString({
    message: 'kimlik numarası bir dize olmalıdır',
  })
  @IsByteLength(11, 11, {
    message: 'kimlik numarası 11 haneli olmalıdır',
  })
  @IsUnique(User, 'identity', { message: 'bu kimlik numarası zaten kayıtlı' })
  identity: string;

  @IsString({
    message: 'adı bir dize olmalıdır',
  })
  firstName: string;

  @IsString({
    message: 'soyadı bir dize olmalıdır',
  })
  lastName: string;

  @IsString()
  @IsMobilePhone('tr-TR')
  phone: string;

  @IsString({
    message: 'doğum tarihi bir Date örneği olmalıdır',
  })
  birthDate: string;

  @IsUnique(User, 'iban', { message: 'bu IBAN numarası zaten kayıtlı' })
  @Length(20, 34, {
    message: 'IBAN numarası 20-34 haneli olmalıdır',
  })
  iban: string;

  @IsEnum(userGenderEnum, {
    message: 'cinsiyet aşağıdaki değerlerden biri olmalıdır: erkek, kadın, diğer',
  })
  gender: userGenderEnum;

  @IsEnum(UserStatusEnum, {
    message: 'durumu aşağıdaki değerlerden biri olmalıdır: AKTIF, INAKTIF, SILINMIŞ',
  })
  @IsOptional()
  status: UserStatusEnum;

  @IsOptional()
  @IsArray()
  @IsEnum(TITLES, { each: true })
  titles: TITLES[];

  @IsOptional()
  @IsNotEmpty({message:"Şehir bilgisi giriniz"})
  @IsUUID()
  provinceId?: string;

  @IsOptional()
  @IsNotEmpty({message:"Semt bilgisi giriniz"})
  @IsUUID()
  districtId?: string;

  @IsOptional()
  @IsString()
  addressDetail?: string;

  @IsOptional()
  @IsEnum(AddressStatusEnum)
  addressStatus?: AddressStatusEnum;
}
