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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company: string;

  @Column()
  user: string;

  @Column()
  time: string;

  /**
   * A description of the entire function.
   *
   */

  @AfterInsert()
  /**
   * A description of the entire function.
   * @return {type} description of return value
   */
  logInsert() {
    console.log(`Inserted job with id: ${this.id}`);
  }

  @AfterUpdate()
  /**
   * A description of the entire function.
   * @return {type} description of return value
   */
  logUpdate() {
    console.log(`Updated job with id: ${this.id}`);
  }

  @AfterRemove()
  /**
   * @return {type} description of return value
   */
  logRemove() {
    console.log(`Remove job with id: ${this.id}`);
  }

}
