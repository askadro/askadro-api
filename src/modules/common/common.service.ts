import { Injectable } from '@nestjs/common';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { ROLES } from '@/constants/enums/roles';
import { Staff } from '@/modules/staff/entities/staff.entity';
import { CompanyService } from '@/modules/company/company.service';
import { UsersService } from '@/modules/users/users.service';
import { StaffService } from '@/modules/staff/staff.service';
import { JobsService } from '@/modules/jobs/jobs.service';
import { TicketsService } from '@/modules/tickets/tickets.service';

@Injectable()
export class CommonService {

  // constructor(
  //   private readonly companyService: CompanyService,
  //   private readonly userService: UsersService,
  //   private readonly staffService: StaffService,
  //   private readonly jobService: JobsService,
  //   private readonly ticketService: TicketsService,
  // ) {
  // }
  //
  // async findUserOrCompany(userId: string, companyId: string, staffId?: string) {
  //   let user: User = null;
  //   let company: Company = null;
  //   let staff: Staff = null;
  //   if (userId) {
  //     user = await this.userService.findOne(userId);
  //   }
  //   if (companyId) {
  //     company = await this.companyService.findOne(companyId);
  //   }
  //   if (staffId) {
  //     staff = await this.staffService.findOne(companyId);
  //   }
  //   return { user, company, staff };
  // }
  //
  //
  // async homepageSummary() {
  //   const userCount = await this.staffService.countUsersWithRole(ROLES.user);
  //   const companyCount = await this.companyService.count();
  //   const { ticketThisMountCount, ticketAllTimeCount } = await this.ticketService.counts();
  //   const { oneYearJobs, oneMountJobs, allJobs } = await this.jobService.counts();
  //
  //   return {
  //     staff: {
  //       count: userCount,
  //       message: 'Mevcut personel sayısı',
  //     },
  //     company: {
  //       count: companyCount,
  //       message: 'Mevcut şirket sayısı',
  //     },
  //     ticket: {
  //       thisMount: {
  //         count: ticketThisMountCount,
  //         message: 'Bu ay mevcut talep sayısı',
  //       },
  //       allTime: {
  //         count: ticketAllTimeCount,
  //         message: 'Tüm talep sayısı',
  //       },
  //     },
  //     job: {
  //       thisMount: {
  //         count: oneMountJobs,
  //         message: 'Bu ay yapılmış işlerin toplamı',
  //       },
  //       thisYear: {
  //         count: oneYearJobs,
  //         message: 'Bu yıl yapılmış işlerin toplamı',
  //       },
  //       allTime: {
  //         count: allJobs,
  //         message: 'yapılmış bütün işlerin toplamı',
  //       },
  //     },
  //   };
  // }

}
