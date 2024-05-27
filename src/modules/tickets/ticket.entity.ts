import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { Job } from '@/modules/jobs/job.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.ticket)
  user: User;

  @OneToOne(() => Company, (Company) => Company.tickets)
  companyId:Company

  @ManyToOne(() => Job, (job) => job.user)
  job: Job[];

  @Column()
  enterHour:string

  @Column()
  exitHour:string

  @Column()
  ticketDate:Date

  @Column()
  ticket_notes:string
}