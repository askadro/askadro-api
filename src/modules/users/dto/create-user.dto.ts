import { IsArray, IsByteLength, IsEnum, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { userGenderEnum } from '../enums/user.gender.enum';
import { UserStatusEnum } from '../enums/user.status.enum';
import { IsUnique } from '../../../utils/validations';
import { CreateAddressDto } from '@/modules/addresses/dto/create-address.dto';
import { Type } from 'class-transformer';
import { CreateAuthDto } from '@/modules/auth/dto/create-auth.dto';
import { TITLES } from '@/enums/titles';
import { User } from '@/modules/users/entities/user.entity';

export class CreateUserDto {
  @IsString({
    message: 'kimlik numarası bir dize olmalıdır',
  })
  @IsByteLength(11, 11, {
    message: 'kimlik numarası 11 haneli olmalıdır',
  })
  @IsUnique(User, 'email', { message: 'bu kimlik numarası zaten kayıtlı' })
  identity: string;

  @IsString({
    message: 'adı bir dize olmalıdır',
  })
  firstName: string;

  @IsString({
    message: 'soyadı bir dize olmalıdır',
  })
  lastName: string;

  @IsString({
    message: 'doğum tarihi bir Date örneği olmalıdır',
  })
  birthDate: string;

  @IsUnique(User, 'email', { message: 'bu IBAN numarası zaten kayıtlı' })
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
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAuthDto)
  auth?: CreateAuthDto;
}
