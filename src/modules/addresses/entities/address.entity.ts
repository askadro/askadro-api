import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AddressStatusEnum } from '@/modules/addresses/enums/address.status.enum';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Province)
  provinceId: Province;

  @ManyToOne(() => District)
  districtId: District;

  @ManyToOne(() => User, user => user.address)
  user: User;

  @ManyToOne(() => Company, company => company.address)
  company: Company;

  @Column({
    type: 'text',
    nullable: true,
  })
  addressDetail: string;

  @Column({
    type: 'enum',
    enum: AddressStatusEnum,
    default:AddressStatusEnum.ACTIVE
  })
  addressStatus: AddressStatusEnum;

  // Diğer sütunlar ve dekoratörler...
}
