import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Authorized } from './authorized.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  shortName: string;

  @Column()
  city: string;

  @Column()
  location: string; // semt

  // @JoinTable({
  //   name: 'company_authorized', // Bağlantı tablosu adı
  //   joinColumn: { name: 'company_id' },
  //   inverseJoinColumn: { name: 'authorized_id' },
  // })
  @OneToMany(() => Authorized, (auth: Authorized) => auth.company) // OneToMany -> ManyToMany
  authorized: Authorized[];

  @Column()
  registrationNumber: string; // sicil numarası

  @Column()
  password: string;

  @Column()
  timeOfPayment: string;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @CreateDateColumn()
  createdDate: Date;
}
