import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Address } from '@/modules/addresses/entities/address.entity';

@Entity('user_address')
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.userAddress)
  @JoinColumn({ name: 'user_id' })
  user: User;


  @OneToOne(() => Address, (address) => address.userAddress)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date;

  @AfterInsert()
  logInsert() {
    console.log(`Insert UserAddress with ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated UserAddress with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Remove UserAddress with id: ${this.id}`);
  }

}
