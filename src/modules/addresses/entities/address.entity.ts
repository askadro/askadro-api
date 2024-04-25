import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';
import { AddressStatusEnum } from '@/modules/addresses/enums/address.status.enum';
import { UserAddress } from '@/modules/users/entities/user.address.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Province)
  @JoinColumn({ name: 'provinceId' })
  city: Province;

  @OneToOne(() => District)
  @JoinColumn({ name: 'districtId' })
  district: District;

  @OneToOne(() => UserAddress, (userAddress) => userAddress.address)
  userAddress: UserAddress;

  @Column({
    type: 'text',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'enum',
    enum: AddressStatusEnum,
  })
  addressStatus: AddressStatusEnum;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @AfterInsert()
  logInsert() {
    console.log(`Insert Addresses with ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Addresses with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Remove Addresses with id: ${this.id}`);
  }

}
