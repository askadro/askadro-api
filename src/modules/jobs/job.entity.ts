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

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Company, (company) => company.job)
  company: Company;

  @ManyToOne(() => User, (user) => user.job)
  user: User;

  @Column()
  startTime: string; // 00:00 formatında girilecek

  @Column()
  endTime: string; // 00:00 formatında girilecek

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
