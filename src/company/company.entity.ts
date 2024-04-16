import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Authorized } from './authorized.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  shorName: string;

  @Column()
  city: string;

  @Column()
  location: string; // semt

  @ManyToOne(() => Authorized, (authorized) => authorized.companyId, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'authorized_id' })
  authorized: Authorized;

  @Column()
  registrationNumber: string; // sicil numarası

  @Column()
  password: string;

  @Column()
  timeOfPayment: string;
}
