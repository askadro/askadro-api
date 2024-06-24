import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Staff } from './staff.entity';
import { BaseEntity } from '@/common/entities/BaseEntity';
import { Company } from '@/modules/company/entities/company.entity';

@Entity()
export class Timesheet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @Column({ type: 'float', nullable: true })
  hoursWorked: number;

  @ManyToOne(() => Staff, (staff) => staff.timesheets)
  staff: Staff;

  @ManyToOne(() => Company, (company) => company.timesheets)
  company: Company;
}
