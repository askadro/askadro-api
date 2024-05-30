import {
  AfterInsert,
  AfterUpdate,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { DEFAULT_PW } from '@/constants/app';
import { BaseEntity } from '@/common/entities/BaseEntity';

@Entity('auths')
export class Auth extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({
    default: null,
    nullable: true,
  })
  email: string;

  @Column({
    default: null,
    nullable: true,
  })
  username: string;

  @Column({
    default:DEFAULT_PW
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

  @AfterInsert()
  logInsert() {
    this.logInfo('Inserted Auth with');
  }

  @AfterUpdate()
  logUpdate() {
    this.logInfo('Updated Auth with');
  }

  @BeforeInsert()
  logDelete() {
    this.logInfo('Deleted Auth with');
  }

  logInfo(infoMessage: string) {
    console.log(`${infoMessage} id: ${this.id}`);
    console.log(`${infoMessage} email: ${this.email}`);
    console.log(`${infoMessage} username: ${this.username}`);
    console.log(`${infoMessage} password: ${this.password}`);
    console.log(`${infoMessage} salt: ${this.salt}`);
    console.log(`${infoMessage} refreshToken: ${this.refreshToken}`);
    console.log(`${infoMessage} refreshTokenExpiryTime: ${this.refreshTokenExpiryTime}`);
    console.log(`${infoMessage} deletedAt: ${this.deletedAt}`);
    console.log(`${infoMessage} createdAt: ${this.createdAt}`);
    console.log(`${infoMessage} updatedAt: ${this.updatedAt}`);
  }
}
