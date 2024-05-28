import { Injectable } from '@nestjs/common';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommonService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {
  }

  async findUserOrCompany(userId: string, companyId: string) {
    let user: User = null;
    let company: Company = null;
    if (userId) {
      user = await this.userRepository.findOne({ where: { id: userId } });
    }
    if (companyId) {
      company = await this.companyRepository.findOne({ where: { id: companyId } });
    }
    return { user, company };
  }



}
