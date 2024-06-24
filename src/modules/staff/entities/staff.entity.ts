import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { userGenderEnum } from '@/modules/users/enums/user.gender.enum';
import { UserStatusEnum } from '@/modules/users/enums/user.status.enum';
import { Job } from '@/modules/jobs/job.entity';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { Address } from '@/modules/addresses/entities/address.entity';
import { TITLES } from '@/constants/enums/titles';
import { BaseEntity } from '@/common/entities/BaseEntity';
import { Timesheet } from '@/modules/staff/entities/timesheet.entity';

@Entity()
export class Staff extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Timesheet, (timesheet) => timesheet.staff)
  timesheets: Timesheet[];

  @OneToMany(() => Job, (job: Job) => job.staff)
  job: Job[];

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.staff)
  ticket: Ticket[];

  @OneToOne(() => Address, (address: Address) => address.user, { nullable: true })
  @JoinColumn()
  address: Address;

  @Column({
    length: 11,
    unique: true,
  })
  identity: string;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
    nullable: true,
  })
  iban: string;

  @Column({
    default: null,
  })
  birthDate: string;

  @Column({
    type: 'enum',
    enum: userGenderEnum,
  })
  gender: userGenderEnum;

  @Column({
    type: 'enum',
    enum: TITLES,
    array: true,
    default: [TITLES.waiter],
  })
  titles: TITLES[];

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.ACTIVE,
  })
  status: UserStatusEnum;


  @AfterInsert()
  logInsert() {
    console.log(`Insert User with ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Remove User with id: ${this.id}`);
  }
}
