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
import { Company } from '@/modules/company/entities/company.entity';
import { Address } from '@/modules/addresses/entities/address.entity';

@Entity('company_address')
export class CompanyAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Company, (company) => company.companyAddress)
  @JoinColumn({
    name: 'company_id',
  })

  company: Company;

  @OneToOne(() => Address, (address) => address.companyAddress)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  // @OneToOne(() => Address, (address) => address.companyAddress)
  // @JoinColumn({ name: 'delivery_address_id' })
  // deliveryAddress: Address;
  //
  // @OneToOne(() => Address, (address) => address.companyAddress)
  // @JoinColumn({ name: 'invoice_address_id' })
  // invoiceAddress: Address;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date;

  @AfterInsert()
  logInsert() {
    this.log(`Insert UserAddress with ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    this.log(`Updated UserAddress with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    this.log(`Remove UserAddress with id: ${this.id}`);
  }

  log(message: string) {
    return message;
  }

}