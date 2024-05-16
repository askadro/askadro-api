import { IsEnum, IsString } from 'class-validator';
import { AddressStatusEnum } from '@/modules/addresses/enums/address.status.enum';

export class CreateAddressCompanyDto {

  @IsString({
    message: 'Adres alanı zorunludur',
  })
  address: string;

  @IsString({
    message: 'Şehir alanı zorunludur',
  })
  city: string;

  @IsString({
    message: 'İlçe alanı zorunludur',
  })
  district: string;

  @IsEnum(AddressStatusEnum, {
    message: 'Adres durumunu belirtiniz',
  })
  addressStatus: AddressStatusEnum;
}