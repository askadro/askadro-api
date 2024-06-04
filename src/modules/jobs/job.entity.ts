import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { BaseEntity } from '@/common/entities/BaseEntity';

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.jobs)
  ticket: Ticket;

  @ManyToOne(() => User, (user) => user.job)
  users: User;

  @Column()
  enterTime: Date; // 00:00 formatında girilecek

  @Column()
  exitTime: Date; // 00:00 formatında girilecek

  @Column({ default: '0' })
  extraTime: string;

  @Column({ default: '0' })
  extraPrice: string;

  @Column()
  title:string

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
