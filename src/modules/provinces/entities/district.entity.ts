import {
  AfterInsert, AfterRemove, AfterUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Province } from "./province.entity";

@Entity()
export class District {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Province, province => province.districts)
  province: Province;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @AfterInsert()
  logInsert() {
    console.log(`Insert District with ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated District with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Remove District with id: ${this.id}`);
  }
}
