import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Authorized } from './authorized.entity';
import { Job } from '../../jobs/job.entity';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { Address } from '@/modules/addresses/entities/address.entity';

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


  @OneToMany(() => Authorized, (auth: Authorized) => auth.company)
  authorized: Authorized;

  @OneToMany(() => Job, (job: Job) => job.company)
  job: Job[];

  @OneToOne(() => Address, address => address.company)
  @JoinColumn({ name: 'addressId' })
  address: Address;

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

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.companyId )
  tickets:Ticket[]

  @BeforeInsert()
  setDefault() {
    this.password = this.registrationNumber;
    if (!this.shortName && this.name) {
      this.shortName = this.name.substring(0, 3).toUpperCase(); // Use substring for clarity
    }
  }
}
