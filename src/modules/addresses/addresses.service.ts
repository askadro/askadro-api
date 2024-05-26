import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '@/modules/addresses/entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {
  }

  async create(body: CreateAddressDto) {
    const address = this.addressRepository.create(body);
    if(!address) {
      throw new BadRequestException('Adres oluşturulurken bir hata oluştu.');
    }
    return await this.addressRepository.save(address);
  }


  findAll() {
    return this.addressRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
