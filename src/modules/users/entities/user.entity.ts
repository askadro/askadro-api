import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  Index,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove, BeforeInsert,
} from 'typeorm';
import { userGenderEnum } from '@/modules/users/enums/user.gender.enum';
import { UserStatusEnum } from '@/modules/users/enums/user.status.enum';
import { Job } from '@/modules/jobs/job.entity';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { Address } from '@/modules/addresses/entities/address.entity';
import { TITLES } from '@/enums/titles';
import { AuthEntity } from '@/common/entities/AuthEntity';

@Entity()
@Index(['firstName', 'lastName'])
export class User extends AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Job, (job: Job) => job.users)
  job: Job[];

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.user)
  ticket: Ticket[];

  @OneToOne(() => Address, (address: Address) => address.user, { nullable: true })
  @JoinColumn()
  address: Address;


  @Column({
    length: 11,
    unique: true,
  })
  identity: string;

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

  @BeforeInsert()
  setDefaults() {
    if (!this.username) {
      this.username = this.identity;
    }
    if (!this.password) {
      this.password = this.identity;
    }
  }
}
