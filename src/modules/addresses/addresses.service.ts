import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '@/modules/addresses/entities/address.entity';
import { Repository } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';
import { AddressStatusEnum } from '@/modules/addresses/enums/address.status.enum';
import { CommonService } from '@/modules/common/common.service';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Province) private provinceRepository: Repository<Province>,
    @InjectRepository(District) private districtRepository: Repository<District>,
    private readonly commonService: CommonService,


  ) {
  }

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const { provinceId, districtId, addressDetail, companyId, userId } = createAddressDto;
    const { district, province } = await this.findProvinceAndDistrict(provinceId, districtId);
    const { user, company } = await this.commonService.findUserOrCompany(userId, companyId);
    const address = new Address();
    address.addressDetail = addressDetail;
    address.province = province;
    address.district = district;
    address.user = user;
    address.company = company;

    return await this.addressRepository.save(address);
  }

  async updateAddress(id: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const address = await this.findOne(id,['province', 'district']);
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    const { userId, companyId ,provinceId, districtId,addressDetail,addressStatus } = updateAddressDto;

    if (provinceId && districtId) {
      const { district, province } = await this.findProvinceAndDistrict(provinceId, districtId);
      address.province = province;
      address.district = district;
    }

    if (addressDetail) {
      address.addressDetail = addressDetail;
    }
    if (addressStatus) {
      address.addressStatus = addressStatus;
    }
    if (userId || companyId) {
      const { user, company } = await this.commonService.findUserOrCompany(userId, companyId);
      address.user = user;
      address.company = company;
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

  async findOne(id: string,relations: string[] = []) {
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
    const province = await this.provinceRepository.findOne({ where: { id: provinceId } });
    if (!province) {
      throw new NotFoundException(`Province with ID ${provinceId} not found`);
    }

    const district = await this.districtRepository.findOne({ where: { id: districtId } });
    if (!district) {
      throw new NotFoundException(`District with ID ${districtId} not found`);
    }

    return { province, district };
  }

}
