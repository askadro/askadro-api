import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { Job } from '@/modules/jobs/job.entity';
import { JobStatusEnum } from '@/enums/JobStatusEnum';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.ticket)
  user: User;

  @ManyToOne(() => Company, (Company) => Company.ticket)
  company:Company

  @OneToMany(() => Job, (job) => job.ticket, { cascade: true })
  jobs: Job[];

  @Column()
  enterTime:string

  @Column()
  exitTime:string

  @Column()
  ticketDate:string

  @Column('text')
  ticketNotes:string

  @Column({default:JobStatusEnum.CREATING})
  status:string
}