import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '@/modules/addresses/entities/address.entity';
import { Repository } from 'typeorm';
import { CommonService } from '@/modules/common/common.service';
import { ProvincesService } from '@/modules/provinces/provinces.service';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    @InjectRepository(Province) private provinceRepository: Repository<Province>,
    @InjectRepository(District) private districtRepository: Repository<District>,
  ) {
  }

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = this.addressRepository.create({
      ...createAddressDto,
      district: { id: createAddressDto.districtId },
      province: { id: createAddressDto.provinceId },
      staff: createAddressDto.staffId ? { id: createAddressDto.staffId } : null,
      company: createAddressDto.companyId ? { id: createAddressDto.companyId } : null,
      user: createAddressDto.userId ? { id: createAddressDto.userId } : null,
    });
    return await this.addressRepository.save(address);
  }

  async updateAddress(id: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const address = await this.findOne(id, ['province', 'district']);
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    const {provinceId, districtId, addressDetail, addressStatus } = updateAddressDto;

    if (provinceId && districtId) {
      address.province.id = updateAddressDto.provinceId;
      address.district.id = updateAddressDto.districtId;
    }

    if (addressDetail) {
      address.addressDetail = addressDetail;
    }
    if (addressStatus) {
      address.addressStatus = addressStatus;
    }

    console.log('After update:', address);

    const updatedAddress = await this.addressRepository.save(address);
    console.log('Saved address:', updatedAddress);

    return updatedAddress;
  }

  async findAll() {
    return this.addressRepository.find({
      relations: ['province', 'district', 'user', 'company'],
    });
  }

  async findOne(id: string, relations: string[] = []) {
    const address = await this.addressRepository.findOne(
      {
        where: { id },
        relations,
      },
    );

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    return address;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressRepository.findOne({ where: { id } });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    Object.assign(address, updateAddressDto);
    return this.addressRepository.save(address);
  }

  async remove(id: string) {
    const address = await this.addressRepository.findOne({ where: { id } });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    await this.addressRepository.remove(address);
    return { message: `Address with ID ${id} removed successfully` };
  }

  async findProvinceAndDistrict(provinceId: string, districtId: string) {
    // const province = await this.provinceService.findOneProvince(provinceId);
    // const district = await this.provinceService.findOneDistrict(districtId);
    // return { province, district };
  }

}
