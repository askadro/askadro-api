import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from '@/modules/addresses/dto/create-address.dto';

export class UpdateAddressUserDto extends PartialType(CreateAddressDto) {
}
