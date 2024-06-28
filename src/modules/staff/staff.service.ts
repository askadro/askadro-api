import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { Staff } from '@/modules/staff/entities/staff.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Timesheet } from '@/modules/staff/entities/timesheet.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { CreateTimesheetDto } from '@/modules/staff/dto/create-timesheet.dto';
import { UpdateTimesheetDto } from '@/modules/staff/dto/update-timesheet.dto';
import { Address } from '@/modules/addresses/entities/address.entity';
import { AddressesService } from '@/modules/addresses/addresses.service';
import { UpdateStaffDto } from '@/modules/staff/dto/update-staff.dto';
import { User } from '@/modules/users/entities/user.entity';
import { SearchStaffDto } from '@/modules/staff/dto/searc-staff.dto';
import { GetTimesheetsDto } from '@/modules/staff/dto/get-timesheet.dto';
import { CompanyService } from '@/modules/company/company.service';
import { ROLES } from '@/constants/enums/roles';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(Timesheet)
    private timesheetRepository: Repository<Timesheet>,
    private readonly addressService: AddressesService,
    private readonly companyService: CompanyService,
  ) {
  }


//in postman
  async create(createStaffDto: CreateStaffDto): Promise<Staff> {
    const { addressStatus, addressDetail, provinceId, districtId, ...staffData } = createStaffDto;
    console.log(createStaffDto);
    let addressEntity: Address = null;
    let staffEntity: Staff = null;
    const staff = this.staffRepository.create(staffData);
    staffEntity = await this.staffRepository.save(staff);

    if (provinceId && districtId) {
      addressEntity = await this.addressService.create({
        addressStatus,
        addressDetail,
        provinceId,
        districtId,
        staffId: staffEntity.id,
      });
    }
    staffEntity.address = addressEntity;
    return await this.staffRepository.save(staffEntity);
  }

  async update(id: string, updateStaffDto: UpdateStaffDto): Promise<Staff> {
    const { addressStatus, addressDetail, districtId, provinceId, ...staffData } = updateStaffDto;
    let addressEntity: Address = null;
    const addressInfo = {
      addressStatus: addressStatus,
      addressDetail: addressDetail,
      provinceId: provinceId,
      districtId: districtId,
    };
    const staff = await this.findOne(id, ['address']);
    console.log(staff, updateStaffDto);

    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
    if (staff.address) {
      addressEntity = await this.addressService.updateAddress(staff.address.id, addressInfo);
    } else {
      addressEntity = await this.addressService.create(addressInfo);
    }

    await this.staffRepository.update(id, { ...staffData, address: { id: addressEntity.id } });
    return;
  }


  async searchStaff(searchStaffDto: SearchStaffDto): Promise<Staff[]> {
    const { query } = searchStaffDto;
    const queryParts = query.split(' ');
    const queryBuilder = this.staffRepository.createQueryBuilder('staff');

    if (queryParts.length === 1) {
      // Tek bir kelime aranıyorsa hem firstName hem lastName'de arama yap
      queryBuilder.where('staff.firstName ILIKE :query', { query: `%${queryParts[0]}%` })
        .orWhere('staff.lastName ILIKE :query', { query: `%${queryParts[0]}%` });
    } else if (queryParts.length > 1) {
      // Birden fazla kelime aranıyorsa firstName ve lastName kombinasyonunda arama yap
      queryBuilder.where('staff.firstName ILIKE :firstName', { firstName: `%${queryParts[0]}%` })
        .andWhere('staff.lastName ILIKE :lastName', { lastName: `%${queryParts[1]}%` });

      // Tüm kombinasyonları ekle
      for (let i = 0; i < queryParts.length; i++) {
        for (let j = 0; j < queryParts.length; j++) {
          if (i !== j) {
            queryBuilder.orWhere(
              'staff.firstName ILIKE :firstName AND staff.lastName ILIKE :lastName',
              { firstName: `%${queryParts[i]}%`, lastName: `%${queryParts[j]}%` },
            );
          }
        }
      }
    }
    queryBuilder.groupBy('staff.id');
    return queryBuilder.getMany();
  }


  async findOne(id: string, relations: string[] = []): Promise<Staff> {
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


  async findAll(): Promise<[Staff[], number]> {
    return this.staffRepository.findAndCount();
  }

  async remove(id: string, soft: string): Promise<Staff> {
    const staff = await this.findOne(id);
    if (!staff) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }
    if (soft) {
      const softDelete = await this.staffRepository.softDelete(id);

      if (!softDelete.affected) {
        throw new NotFoundException('Kullanıcı bulunamadı.');
      }
      return staff;
    }
    return await this.staffRepository.remove(staff);
  }

  async deletedStaffs(): Promise<Staff[]> {
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

  async countUsersWithRole(role: ROLES) {
    return await this.staffRepository
      .createQueryBuilder('user')
      .where(':role = ANY(user.roles)', { role })
      .getCount();
  }


  async createTimesheet({ staffId, date, hoursWorked, companyId }: CreateTimesheetDto): Promise<Timesheet> {
    const staff = await this.findOne(staffId);
    const company = await this.companyService.findOne(companyId);
    const timesheet = this.timesheetRepository.create({
      date,
      hoursWorked,
      staff: { id: staff.id },
      company: { id: company.id },
    });
    return this.timesheetRepository.save(timesheet);
  }

  async updateTimesheet(id: string, { hoursWorked }: UpdateTimesheetDto): Promise<Timesheet> {
    const timesheet = await this.findTimesheet(id);
    timesheet.hoursWorked = hoursWorked;
    return this.timesheetRepository.save(timesheet);
  }

  async deleteTimesheet(id: string) {
    await this.timesheetRepository.delete(id);
    return {
      result: true,
      message: `Timesheet deleted successfully`,
    };
  }

  async findTimesheet(id: string): Promise<Timesheet> {
    const timesheet = await this.timesheetRepository.findOne({ where: { id: id } });
    if (!timesheet) {
      throw new NotFoundException(`Timesheet with ID ${id} not found`);
    }
    return timesheet;
  }

  async getTimesheetsByCompanyAndDate(getTimesheetsDto: GetTimesheetsDto): Promise<any> {
    const { companyId, date } = getTimesheetsDto;
    const cDate = new Date(date);
    const year = cDate.getFullYear();
    const month = cDate.getMonth() + 1;
    const timesheets = await this.timesheetRepository.createQueryBuilder('timesheet')
      .innerJoinAndSelect('timesheet.staff', 'staff')
      .where('timesheet.companyId = :companyId', { companyId })
      .andWhere('EXTRACT(MONTH FROM timesheet.date) = :month', { month })
      .andWhere('EXTRACT(YEAR FROM timesheet.date) = :year', { year })
      .getMany();

    const groupedTimesheets = timesheets.reduce((acc, timesheet) => {
      const staffId = timesheet.staff.id;
      if (!acc[staffId]) {
        acc[staffId] = {
          staff: timesheet.staff,
          dates: [],
        };
      }
      acc[staffId].dates.push({ date: timesheet.date, hours: timesheet.hoursWorked, id: timesheet.id });
      return acc;
    }, {});

    return Object.values(groupedTimesheets);
  }


  async findOneByTimesheet(id: string): Promise<Staff> {
    return this.staffRepository.findOne({ where: { id }, relations: ['timesheets'] });
  }

}
