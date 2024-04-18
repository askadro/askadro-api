import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { Authorized } from './entities/authorized.entity';
import { I18n, I18nContext, I18nService } from 'nestjs-i18n';
import { CreateAuthorizedDto } from './dtos/create-authorized.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private comp: Repository<Company>,
    @InjectRepository(Authorized) private auth: Repository<Authorized>,
    private i18n: I18nService,
  ) {}

  async create(body: {
    name: string;
    phone: string;
    shortName: string;
    city: string;
    location: string;
    authorized: Authorized[]; // Array of authorized objects
    registrationNumber: string;
    password: string;
    timeOfPayment: string;
    totalWorkingTime: string;
  }) {
    const company = this.comp.create({
      city: body.city?.toLowerCase(),
      name: body.name?.toLowerCase(),
      phone: body.phone?.trim(),
      shortName: body.shortName?.toLowerCase(),
      location: body.location?.toLowerCase(),
      registrationNumber: body.registrationNumber?.trim(),
      password: body.password,
      timeOfPayment: body.timeOfPayment?.trim(),
      totalWorkingTime: body.totalWorkingTime?.trim(),
    });

    const resultCompany = await this.comp.save(company);
    const authorizeds = body.authorized.map((auth) => {
      const authozed = new Authorized();
      authozed.authorizedEmail = auth.authorizedEmail;
      authozed.authorizedPerson = auth.authorizedPerson;
      authozed.authorizedPhone = auth.authorizedPhone;
      authozed.authorizedTitle = auth.authorizedTitle;
      authozed.company = resultCompany;
      return authozed;
    });

    await this.auth.save(authorizeds);
    return resultCompany;
  }

  async createAuthorized(body: CreateAuthorizedDto[]) {
    const authorizeds = body.map((auth) => {
      const authozed = new Authorized();
      authozed.authorizedEmail = auth.authorizedEmail;
      authozed.authorizedPerson = auth.authorizedPerson;
      authozed.authorizedPhone = auth.authorizedPhone;
      authozed.authorizedTitle = auth.authorizedTitle;
      authozed.company = auth.company;
      return authozed;
    });

    return await this.auth.save(authorizeds);
  }

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
