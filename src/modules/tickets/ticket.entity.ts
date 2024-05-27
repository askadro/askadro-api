import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { Job } from '@/modules/jobs/job.entity';

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
  ticketDate:Date

  @Column('text')
  ticketNotes:string

  @Column({default:"active" })
  status:string
}