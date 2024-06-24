import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from '@/modules/staff/entities/staff.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Timesheet } from '@/modules/staff/entities/timesheet.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { CreateTimesheetDto } from '@/modules/staff/dto/create-timesheet.dto';
import { UpdateTimesheetDto } from '@/modules/staff/dto/update-timesheet.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(Timesheet)
    private timesheetRepository: Repository<Timesheet>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {
  }

  async createTimesheet(id: string, { staffId, date, hoursWorked, companyId }: CreateTimesheetDto): Promise<Timesheet> {
    const staff = await this.staffRepository.findOne({ where: { id: staffId } });
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    const timesheet = new Timesheet();
    timesheet.date = date;
    timesheet.hoursWorked = hoursWorked;
    timesheet.staff.id = staff.id;
    timesheet.company.id = company.id;
    return this.timesheetRepository.save(timesheet);
  }

  async updateTimesheet(id: string, { hoursWorked }: UpdateTimesheetDto): Promise<Timesheet> {
    const timesheet = await this.timesheetRepository.findOne({ where: { id } });
    timesheet.hoursWorked = hoursWorked;
    return this.timesheetRepository.save(timesheet);
  }

  async findOneByTimesheet(id: string): Promise<Staff> {
    return this.staffRepository.findOne({ where: { id }, relations: ['timesheets'] });
  }


  async create(createStaffDto: CreateStaffDto): Promise<Staff> {
    const staff = this.staffRepository.create(createStaffDto);
    return await this.staffRepository.save(staff);
  }

  async update(id: string, updateStaffDto: CreateStaffDto): Promise<Staff> {
    await this.staffRepository.update(id, updateStaffDto);
    return this.staffRepository.findOne({ where: { id } });
  }

  async userJobFindOne(id: string) {
    const jobStaff = await this.staffRepository.findOne({
      where: {
        id,
      },
      select: {
        job: {
          id: true,
          enterTime: true,
          extraTime: true,
          exitTime: true,
        },
      },
      relations: ['job'],
    });

    if (!jobStaff) {
      throw new NotFoundException('Job user bulunamadı.');
    }

    return jobStaff;
  }

  async userSearch(query: string) {
    const staffs = await this.staffRepository.createQueryBuilder('user')
      .where('CONCAT(user.firstName, \' \', user.lastName) ilike :fullName', { fullName: `%${query}%` })
      .getMany();

    if (!staffs) {
      throw new NotFoundException('Kullanıcılar bulunamadı.');
    }

    return staffs;
  }


  async findOne(id: string, relations: object = {}): Promise<Staff> {
    const staff: Staff = await this.staffRepository.findOne({
      where: {
        id: id,
      },
      relations,
    });
    if (!staff) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }
    return staff;
  }

  async deletedUsers(): Promise<Staff[]> {
    const staffs: Staff[] = await this.staffRepository.find({
      where: {
        deletedAt: Not(IsNull()),
      },
      withDeleted: true,
    });

    if (!staffs) {
      throw new NotFoundException('Kullanıcılar bulunamadı.');
    }
    return staffs;
  }

  async findAll(): Promise<Staff[]> {
    return this.staffRepository.find({ relations: ['jobs', 'timesheet'] });
  }
}
