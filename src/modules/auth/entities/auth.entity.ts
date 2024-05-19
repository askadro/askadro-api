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

@Entity('auths')
export class Auth {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user: User) => user.id)
  @JoinColumn({ name: 'auth_id' })
  authId: User;

  @Column({
    default: null,
  })
  email: string;

  @Column({
    default: null,
  })
  username: string;

  @Column()
  password: string;

  @Column(
    {
      nullable: true,
    },
  )
  salt?: string;

  @Column(
    {
      nullable: true,
    },
  )
  refreshToken?: string;

  @Column(
    {
      nullable: true,
    },
  )
  refreshTokenExpiryTime?: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    default: null,
  })
  public deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date;

  default() {
    return {
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }


  @AfterInsert()
  @BeforeInsert()
  logInsert() {
    this.logInfo('Inserted Auth with ');
  }

  @AfterUpdate()
  @BeforeInsert()
  logUpdate() {
    this.logInfo('Updated Auth with ');
  }

  @AfterInsert()
  @BeforeInsert()
  logDelete() {
    this.logInfo('Deleted Auth with ');
  }

  logInfo(infoMessage: string) {
    console.log(this);
    console.log(`${infoMessage} ${this.id}`);
    console.log(`${infoMessage} ${this.email}`);
    console.log(`${infoMessage} ${this.password}`);
    console.log(`${infoMessage} ${this.salt}`);
    console.log(`${infoMessage} ${this.refreshToken}`);
    console.log(`${infoMessage} ${this.refreshTokenExpiryTime}`);
    console.log(`${infoMessage} ${this.deletedAt}`);
    console.log(`${infoMessage} ${this.createdAt}`);
    console.log(`${infoMessage} ${this.updatedAt}`);
  }
}
