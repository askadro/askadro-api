import { Injectable } from '@nestjs/common';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Job } from '@/modules/jobs/job.entity';
import { startOfMonth, startOfYear } from 'date-fns';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { ROLES } from '@/constants/enums/roles';

@Injectable()
export class CommonService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Job) private jobRepository: Repository<Job>,
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
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

  async countUsersWithRole(role: ROLES) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(':role = ANY(user.roles)', { role })
      .getCount();
  }

  async homepageSummary() {
    const today = new Date();
    const firstDayOfCurrentMonth = startOfMonth(today);
    const firstDayCurrentYear = startOfYear(today);
    const userCount = await this.countUsersWithRole(ROLES.user);
    const companyCount = await this.companyRepository.count({});
    const ticketThisMountCount = await this.ticketRepository.count({
      where: { ticketDate: Between(firstDayOfCurrentMonth, today) },
    });
    const ticketAllTimeCount = await this.ticketRepository.count({});
    const oneMountJobs = await this.jobRepository.count({
      where: {
        createdAt: Between(firstDayOfCurrentMonth, today),
      },
    });
    const oneYearJobs = await this.jobRepository.count({
      where: {
        createdAt: Between(firstDayCurrentYear, today),
      },
    });
    const allJobs = await this.jobRepository.count({});

    return {
      staff: {
        count: userCount,
        message: 'Mevcut personel sayısı',
      },
      company: {
        count: companyCount,
        message: 'Mevcut şirket sayısı',
      },
      ticket: {
        thisMount: {
          count: ticketThisMountCount,
          message: 'Bu ay mevcut talep sayısı',
        },
        allTime: {
          count: ticketAllTimeCount,
          message: 'Tüm talep sayısı',
        },
      },
      job: {
        thisMount: {
          count: oneMountJobs,
          message: 'Bu ay yapılmış işlerin toplamı',
        },
        thisYear: {
          count: oneYearJobs,
          message: 'Bu yıl yapılmış işlerin toplamı',
        },
        allTime: {
          count: allJobs,
          message: 'yapılmış bütün işlerin toplamı',
        }
      },
    };
  }

}
