import { AddressStatusEnum } from '@/modules/addresses/enums/address.status.enum';
import { IsString, IsEmail, IsEnum, IsUUID, IsOptional, Length, IsDateString, IsNotEmpty } from 'class-validator';
import { userGenderEnum } from '@/constants/enums/user.gender.enum';
import { ROLES } from '@/constants/enums/roles';
import { UserStatusEnum } from '@/constants/enums/userStatusEnum';


export class CreateKcUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsString()
  password: string;


  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

}
