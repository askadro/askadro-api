import { IsByteLength, IsEnum, IsIBAN, IsOptional, IsString, Length } from 'class-validator';
import { userGenderEnum } from '../enums/user.gender.enum';
import { UserStatusEnum } from '../enums/user.status.enum';
import { IsUnique } from '../../../utils/validations';
import { CreateAddressDto } from '@/modules/addresses/dto/create-address.dto';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';


export class CreateUserDto {
  @IsString({
    message: 'kimlik numarası bir dize olmalıdır',
  })
  @IsByteLength(11, 11, {
    message: 'kimlik numarası 11 haneli olmalıdır',
  })
  @IsUnique(
    {
      tableName: 'user',
      column: 'Identity',
    },
    {
      message: 'bu kimlik numarası zaten kayıtlı',
    },
  )
  Identity: string;

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
  birthDate: Date;

  @IsUnique({
    tableName: 'user',
    column: 'iban',
  }, {
    message: 'bu IBAN numarası zaten kayıtlı',
  })
  @Length(20, 34, {
    message: 'IBAN numarası 20-34 haneli olmalıdır',
  })
  iban: string;

  @IsEnum(userGenderEnum, {
    message:
      'cinsiyet aşağıdaki değerlerden biri olmalıdır: erkek, kadın, diğer',
  })
  gender: userGenderEnum;

  @IsEnum(UserStatusEnum, {
    message:
      'durumu aşağıdaki değerlerden biri olmalıdır: AKTIF, INAKTIF, SILINMIŞ',
  })
  @IsOptional()
  status: UserStatusEnum;

  @IsOptional()
  address?: CreateAddressDto;

  @IsOptional()
  user_auth?:CreateAuthDto
}
