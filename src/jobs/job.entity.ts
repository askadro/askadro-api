import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  user: string;

  @Column()
  time: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted job with ' + this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated job with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log('Remover jov witd ', this.id);
  }
}
