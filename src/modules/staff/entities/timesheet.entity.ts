import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Staff } from './staff.entity';
import { BaseEntity } from '@/common/entities/BaseEntity';
import { Company } from '@/modules/company/entities/company.entity';

@Entity()
export class Timesheet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  date: Date;

  @Column({ type: 'float', nullable: true })
  hoursWorked: number;

  @ManyToOne(() => Staff, (staff) => staff.timesheets)
  staff: Staff;

  @ManyToOne(() => Company, (company) => company.timesheets)
  company: Company;
}
