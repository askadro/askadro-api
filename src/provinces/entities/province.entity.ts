import {
  AfterInsert, AfterRemove, AfterUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { District } from "./district.entity";

@Entity()
export class Province {

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @OneToMany(()=>District,(district)=>district)
  districts:District[]



  @CreateDateColumn({type: "timestamp",default:()=>"CURRENT_TIMESTAMP(6)"})
  createdAt: Date

  @UpdateDateColumn({type: "timestamp",default:()=>"CURRENT_TIMESTAMP(6)"})
  updatedAt: Date

  @DeleteDateColumn({type: "timestamp",default: null})
  deletedAt: Date

  @AfterInsert()
  logInsert() {
    console.log(`Insert Province with ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Province with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Remove Province with id: ${this.id}`);
  }
}
