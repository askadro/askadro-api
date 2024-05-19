import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { Authorized } from './entities/authorized.entity';
import { I18nService } from 'nestjs-i18n';
import { CreateAuthorizedDto } from './dtos/create-authorized.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { CreateCompanyDto } from '@/modules/company/dtos/create-company.dto';
import { CreateAddressUserDto } from '@/modules/users/dto/create-address-user.dto';
import { CompanyAddress } from '@/modules/company/entities/company.address.entity';
import { CreateAddressCompanyDto } from '@/modules/company/dtos/create-address-company.dto';
import { Province } from '@/modules/provinces/entities/province.entity';
import { Address } from '@/modules/addresses/entities/address.entity';
import { District } from '@/modules/provinces/entities/district.entity';
import { Auth } from '@/modules/auth/entities/auth.entity';
import { CreateAuthDto } from '@/modules/auth/dto/create-auth.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private comp: Repository<Company>,
    @InjectRepository(CompanyAddress) private companyAddressRepository: Repository<CompanyAddress>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    @InjectRepository(Province) private provinceRepository: Repository<Province>,
    @InjectRepository(District) private districtRepository: Repository<District>,
    @InjectRepository(Authorized) private authorizedRepository: Repository<Authorized>,
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private i18n: I18nService,
  ) {
  }

  async create(body: {
    company: CreateCompanyDto,
    authorized?: CreateAuthorizedDto,
    address?: CreateAddressUserDto
    auth?: CreateAuthDto
  }) {
    const {
      company: createCompany,
      authorized: createAuthorized,
      address: createAddress,
      auth: createAuth,
    } = body;
    const companyCreate = this.comp.create({
      name: createCompany.name?.toLowerCase(),
      phone: createCompany.phone?.trim(),
      shortName: createCompany.shortName?.toLowerCase(),
      registrationNumber: createCompany.registrationNumber?.trim(),
      password: createCompany.password,
      timeOfPayment: createCompany.timeOfPayment?.trim(),
      totalWorkingTime: createCompany.totalWorkingTime?.trim(),
    });

    const resultCompany = await this.comp.save(companyCreate);

    let authorized: Authorized = null;
    if (createAuthorized) {
      authorized = await this.createAuthorized({ ...createAuthorized, company: resultCompany });
    }

    let address: CompanyAddress = null;
    if (createAddress) {
      address = await this.createAddress(resultCompany.id, createAddress);
    }

    let authors: Auth = null;
    if (createAuth) {
      authors = await this.authRepository.save(createAuth);
    }

    return {
      Company: resultCompany,
      Authorized: authorized,
      Address: address,
      Auth: authors,
    };
  }

  async createAuthorized(body: CreateAuthorizedDto) {
    const authorized = new Authorized();
    authorized.authorizedPerson = body.authorizedPerson;
    authorized.authorizedPhone = body.authorizedPhone;
    authorized.authorizedTitle = body.authorizedTitle;
    authorized.company = body.company;

    return await this.authorizedRepository.save(authorized);
  }


  async createAddress(id: string, createAddressCompanyDto: CreateAddressCompanyDto) {
    const company = await this.comp.findOne({
      where: {
        id: id,
      },
    });

    if (!company) {
      throw new NotFoundException('company not found');
    }

    const province: Province = await this.provinceRepository.findOne({
      where: {
        id: createAddressCompanyDto.city,
      },
    });

    if (!province) {
      throw new NotFoundException('province not found');
    }

    const district: District = await this.districtRepository.findOne({
      where: {
        id: createAddressCompanyDto.district,
      },
    });

    if (!district) {
      throw new NotFoundException('district not found');
    }

    const address: Address = this.addressRepository.create({
      city: province,
      district: district,
      address: createAddressCompanyDto.address,
      addressStatus: createAddressCompanyDto.addressStatus,
    });

    const addressSave: Address = await this.addressRepository.save(address);


    const companyAddress: CompanyAddress = this.companyAddressRepository.create({
      company: company,
      address: addressSave,
    });

    return await this.companyAddressRepository.save(companyAddress);

  }

  // async updateAddress(id: string, updateAddressUserDto: UpdateAddressUserDto): Promise<Address> {
  //   const userAddress: Address = await this.addressRepository.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  //
  //   if (!userAddress) {
  //     throw new NotFoundException('user address not found');
  //   }
  //
  //   Object.assign(userAddress, updateAddressUserDto);
  //
  //
  //   return this.addressRepository.save(userAddress);
  // }


  async findOne(id: string, relations: object = {}) {
    const auths = await this.comp.findOne({
      where: { id },
      relations,
    });
    if (auths) {
      return auths;
    }
    throw new NotFoundException();
  }

  async find() {
    const auths = await this.comp.find();
    if (auths) {
      return auths;
    }
    throw new NotFoundException();
  }

  async update(id: string, attrs: UpdateCompanyDto) {
    const company = await this.findOne(id);
    if (!company) {
      throw new NotFoundException('Job not found');
    }
    Object.assign(company, attrs);
    return this.comp.save(company);
  }

  async remove(id: string) {
    const company = await this.findOne(id);
    if (!company) {
      throw new NotFoundException();
    }
    return this.comp.remove(company);
  }
}
