import { Column, PrimaryGeneratedColumn, Entity, ManyToOne,  OneToMany } from 'typeorm';
import { Company } from '@/modules/company/entities/company.entity';
import { Job } from '@/modules/jobs/job.entity';
import { JobStatusEnum } from '@/constants/enums/JobStatusEnum';
import { BaseEntity } from '@/common/entities/BaseEntity';
import { Staff } from '@/modules/staff/entities/staff.entity';

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Staff, (staff) => staff.ticket)
  staff: Staff;

  @ManyToOne(() => Company, (Company) => Company.ticket)
  company:Company

  @OneToMany(() => Job, (job) => job.ticket, { cascade: true })
  jobs: Job[];

  @Column()
  enterTime:Date

  @Column()
  exitTime:Date

  @Column()
  ticketDate:Date

  @Column('text')
  ticketNotes:string

  @Column({default:JobStatusEnum.CREATING})
  status:string
}