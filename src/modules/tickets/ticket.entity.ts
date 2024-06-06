import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { Job } from '@/modules/jobs/job.entity';
import { JobStatusEnum } from '@/constants/enums/JobStatusEnum';
import { Auth } from '@/modules/auth/entities/auth.entity';
import { BaseEntity } from '@/common/entities/BaseEntity';

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.ticket)
  user: User;

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