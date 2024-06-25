import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, Relation } from 'typeorm';
import { AddressStatusEnum } from '@/modules/addresses/enums/address.status.enum';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { Staff } from '@/modules/staff/entities/staff.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Province)
  @JoinColumn({ name: 'provinceId' })
  province: Relation<Province>;

  @ManyToOne(() => District)
  @JoinColumn({ name: 'districtId' })
  district: Relation<District>;

  @OneToOne(() => User, (user: User) => user.address, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @OneToOne(() => Company, (company: Company) => company.address, { nullable: true })
  @JoinColumn({ name: 'companyId' })
  company: Relation<Company>;

  @OneToOne(() => Staff, (staff: Staff) => staff.address, { nullable: true })
  @JoinColumn({ name: 'staffId' })
  staff: Relation<Staff>;

  @Column({
    type: 'text',
    nullable: true,
  })
  addressDetail: string;

  @Column({
    type: 'enum',
    enum: AddressStatusEnum,
    default: AddressStatusEnum.ACTIVE,
  })
  addressStatus: AddressStatusEnum;
}
