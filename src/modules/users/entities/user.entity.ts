import {
  AfterInsert, AfterRemove, AfterUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { userGenderEnum } from "../enums/user.gender.enum";
import { UserStatusEnum } from "../enums/user.status.enum";
import { Job } from "src/jobs/job.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 11,
    unique: true
  })
  Identity: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: "date",
    default: null
  })
  birthDate: Date;

  @Column({
    type: "enum",
    enum: userGenderEnum
  })
  gender: userGenderEnum;

  @OneToMany(() => Job, (job: Job) => job.user)
  job: Job[];

  @Column({
    type: "enum",
    enum: UserStatusEnum,
    default: UserStatusEnum.ACTIVE
  })
  status: UserStatusEnum;

  @DeleteDateColumn({
    type: "timestamp",
    default: null
  })
  public deletedAt: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

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
