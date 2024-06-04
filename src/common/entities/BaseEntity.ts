import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({type:"timestamp", default:()=> "CURRENT_TIMESTAMP(6)"})
  createdAt: Date;

  @UpdateDateColumn({type:"timestamp", default:()=> "CURRENT_TIMESTAMP(6)",onUpdate:"CURRENT_TIMESTAMP(6)"})
  updatedAt: Date;

  @DeleteDateColumn({type:"timestamp",nullable:true,onUpdate:"CURRENT_TIMESTAMP(6)"})
  deletedAt?: Date | null;
}