import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  ManyToOne,
} from 'typeorm';
import { Company } from '../company/entities/company.entity';
import { User } from '../users/entities/user.entity';
import { Ticket } from '@/modules/tickets/ticket.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.jobs)
  ticket:Ticket

  @ManyToOne(() => Company, (company) => company.job)
  company: Company;

  @ManyToOne(() => User, (user) => user.job)
  user: User;

  @Column()
  enterTime: string; // 00:00 formatında girilecek

  @Column()
  exitTime: string; // 00:00 formatında girilecek

  @Column()
  extraTime: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted job with ' + this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated job with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log('Remover jov witd ', this.id);
  }
}
