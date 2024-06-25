import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { Authorized } from './entities/authorized.entity';
import { I18nService } from 'nestjs-i18n';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { CreateCompanyDto } from '@/modules/company/dtos/create-company.dto';
import { Address } from '@/modules/addresses/entities/address.entity';
import { AddressesService } from '@/modules/addresses/addresses.service';
import { CreateAuthorizedDto } from '@/modules/company/dtos/create-authorized.dto';
import { UpdateAuthorizedDto } from '@/modules/company/dtos/update-authorized.dto';
import { Bcrypt } from '@/utils/bcrypt';
import { DEFAULT_PW } from '@/constants/app';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private comp: Repository<Company>,
    @InjectRepository(Authorized) private authorizedRepository: Repository<Authorized>,
    private readonly addressService: AddressesService,
  ) {
  }

  async create(body: CreateCompanyDto) {
    const { authorized, provinceId, districtId, addressStatus, addressDetail, ...companyData } = body;
    let companyEntity: Company = null;
    let addressEntity: Address = null;
    const hashedPassword = Bcrypt.hash(companyData.registrationNumber || DEFAULT_PW);
    const company = this.comp.create({ ...companyData, password: hashedPassword });
    companyEntity = await this.comp.save(company);

    if (provinceId && districtId) {
      addressEntity = await this.addressService.create({
        provinceId,
        districtId,
        addressStatus,
        addressDetail,
        companyId: companyEntity.id,
      });
    }

    if (authorized && Array.isArray(authorized)) {
      company.authorized = await Promise.all(
        authorized.map(authData => this.createAuthorized({ ...authData, companyId: companyEntity.id })),
      );
    }

    return await this.comp.save({ ...companyEntity, address: addressEntity });
  }

  async createAuthorized(authorized: CreateAuthorizedDto): Promise<Authorized> {
    const { companyId, authorizedPerson, authorizedTitle, authorizedPhone, authorizedEmail } = authorized;
    const authCompany = await this.comp.findOne({ where: { id: companyId } });
    const authorizes = new Authorized();
    authorizes.company = authCompany;
    authorizes.authorizedTitle = authorizedTitle;
    authorizes.authorizedPhone = authorizedPhone;
    authorizes.authorizedPerson = authorizedPerson;
    authorizes.authorizedEmail = authorizedEmail;

    return await this.authorizedRepository.save(authorizes);
  }

  async updateAuthorized(id: string, authorized: UpdateAuthorizedDto): Promise<Authorized> {
    const authorize = await this.findAuthorized(id);
    if (!authorize) {
      throw new NotFoundException('Authorize not found');
    }
    Object.assign(authorize, authorized);
    return this.authorizedRepository.save(authorize);
  }

  async findAuthorized(id: string) {
    const authorize = await this.authorizedRepository.findOne({ where: { id } });
    if (!authorize) {
      throw new NotFoundException();
    }
    return authorize;
  }

  async findOne(id: string, relations: object = {}) {
    const company = await this.comp.findOne({
      where: { id },
      relations,
    });
    if (company) {
      return company;
    }
    throw new NotFoundException();
  }

  async find() {
    const auths = await this.comp.find({relations:["address","address.province","address.district"]});
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

  async count(){
    return await this.comp.count()
  }
}
