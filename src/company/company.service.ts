import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { Authorized } from './entities/authorized.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private comp: Repository<Company>,
    @InjectRepository(Authorized) private auth: Repository<Authorized>,
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
  }) {
    const company = this.comp.create({
      city: body.city,
      name: body.name,
      phone: body.phone,
      shortName: body.shortName,
      location: body.location,
      registrationNumber: body.registrationNumber,
      password: body.password,
      timeOfPayment: body.timeOfPayment,
    });

    const resultCompany = await this.comp.save(company);
    // // Yetkilileri şirkete ata
    const authorizeds = body.authorized.map((auth) => {
      const authozed = new Authorized();
      authozed.authorizedEmail = auth.authorizedEmail;
      authozed.authorizedPerson = auth.authorizedPerson;
      authozed.authorizedPhone = auth.authorizedPhone;
      authozed.authorizedTitle = auth.authorizedTitle;
      authozed.company = resultCompany;
      this.auth.save(authozed);
      return authozed;
    });

    return await this.auth.save(authorizeds);
  }

  async findOne(id: string) {
    const auths = await this.comp.findOne({
      where: { id },
      relations: { authorized: true },
    });
    if (auths) {
      return auths;
    }
    throw new NotFoundException(id);
  }

  async find() {
    const auths = await this.comp.find();
    if (auths) {
      return auths;
    }
    throw new NotFoundException();
  }

  async update(id: string, attrs: Partial<Company>) {
    const company = await this.findOne(id);
    if (!company) {
      throw new Error('Job not found');
    }
    Object.assign(company, attrs);
    return this.comp.save(company);
  }
  
  async remove(id: string) {
    const company = await this.findOne(id);
    if (!company) {
      throw new Error('company not found');
    }
    return this.comp.remove(company);
  }
}
