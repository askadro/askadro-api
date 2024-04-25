import { IsEnum, IsString } from 'class-validator';
import { AddressStatusEnum } from '@/modules/addresses/enums/address.status.enum';


export class CreateAddressUserDto {

  @IsString({
    message: 'Adres alanı zorunludur',
  })
  address: string;

  @IsEnum(AddressStatusEnum, {
    message: 'Adres durumunu belirtiniz',
  })
  addressStatus: AddressStatusEnum;

  @IsString({
    message: 'Şehir alanı zorunludur',
  })
  city: string;

  @IsString({
    message: 'İlçe alanı zorunludur',
  })
  district: string;

}
