import { userGenderEnum } from '@/constants/enums/user.gender.enum';
import { StaffStatusEnum } from '@/constants/enums/staffStatusEnum';
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
  status: StaffStatusEnum;
  @Expose()
  titles: TITLES[];
  @Expose()
  address: CreateAddressDto;
  @Expose()
  access_token: string;
  @Expose()
  refreshToken: string;
  @Expose()
  refreshTokenExpiryTime: string;
}