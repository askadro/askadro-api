import {
  AfterInsert, AfterRemove, AfterUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { userGenderEnum } from "../enums/user.gender.enum";
import { UserStatusEnum } from "../enums/user.status.enum";

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
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  age: string;

  @Column({
    type: "date",
    default: null
  })
  birth_date: Date;

  @Column({
    type: "enum",
    enum: userGenderEnum
  })
  gender: userGenderEnum;

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
  public deleted_at: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

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
