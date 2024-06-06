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
import { Auth } from '@/modules/auth/entities/auth.entity';
import { AuthEntity } from '@/common/entities/AuthEntity';
import { BaseEntity } from '@/common/entities/BaseEntity';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  shortName: string;

  @Column()
  email: string;

  @OneToMany(() => Authorized, (authorized: Authorized) => authorized.company)
  authorized: Authorized[];

  @OneToOne(() => Address, (address: Address) => address.user, { nullable: true })
  @JoinColumn()
  address: Address;

  @Column()
  registrationNumber: string; // sicil numarası

  @Column()
  password: string;

  @Column()
  timeOfPayment: string;

  @Column()
  totalWorkingTime: string;

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.company )
  ticket:Ticket[]

  @BeforeInsert()
  setDefault() {
    this.password = this.registrationNumber;
    if (!this.shortName && this.name) {
      this.shortName = this.name.substring(0, 3).toUpperCase(); // Use substring for clarity
    }
  }
}
