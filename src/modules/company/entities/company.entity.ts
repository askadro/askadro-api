import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Authorized } from './authorized.entity';
import { Job } from '../../jobs/job.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  shortName: string;

  @Column()
  city: string;

  @Column()
  location: string; // semt

  @OneToMany(() => Authorized, (auth: Authorized) => auth.company)
  authorized: Authorized[];

  @OneToMany(() => Job, (job: Job) => job.company)
  job: Job[];

  @Column()
  registrationNumber: string; // sicil numarası

  @Column()
  password: string;

  @Column()
  timeOfPayment: string;

  @Column()
  totalWorkingTime: string;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @BeforeInsert()
  setDefault() {
    this.password = this.registrationNumber;
    if (!this.shortName && this.name) {
      this.shortName = this.name.substring(0, 3).toUpperCase(); // Use substring for clarity
    }
  }
}
