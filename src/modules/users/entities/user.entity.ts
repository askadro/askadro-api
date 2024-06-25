import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Index,
  AfterInsert,
  AfterUpdate,
  AfterRemove, BeforeInsert,
} from 'typeorm';
import { userGenderEnum } from '@/constants/enums/user.gender.enum';
import { Address } from '@/modules/addresses/entities/address.entity';
import { DEFAULT_PW } from '@/constants/app';
import { ROLES } from '@/constants/enums/roles';
import { BaseEntity } from '@/common/entities/BaseEntity';
import { UserStatusEnum } from '@/constants/enums/userStatusEnum';

@Entity()
@Index(['firstName', 'lastName'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  username:string

  @Column({
    default:DEFAULT_PW,
  })
  password: string;

  @Column({
    nullable: true,
  })
  salt?: string;

  @Column({
    nullable: true,
  })
  refreshToken?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  refreshTokenExpiryTime?: Date;

  @Column({
    type: 'enum',
    enum: ROLES,
    default: [ROLES.user],
  })
  roles:ROLES

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
  setDefaults(){
    if(!this.username) {
      this.username = this.identity;
    }
  }
}
