import { userGenderEnum } from '@/modules/users/enums/user.gender.enum';
import { UserStatusEnum } from '@/modules/users/enums/user.status.enum';
import { TITLES } from '@/constants/enums/titles';
import { CreateAddressDto } from '@/modules/addresses/dto/create-address.dto';
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id:string
  @Expose()
  identity: string;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  email: string;
  @Expose()
  birthDate: string;
  @Expose()
  iban: string;
  @Expose()
  gender: userGenderEnum;
  @Expose()
  status: UserStatusEnum;
  @Expose()
  titles: TITLES[];
  @Expose()
  address: CreateAddressDto;
}