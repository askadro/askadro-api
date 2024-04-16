import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class Authorized {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  authorizedPerson: string;

  @Column()
  authorizedPhone: string;

  @Column()
  authorizedEmail: string;

  @Column()
  authorizedTitle: string;

  @OneToMany(() => Company, (company) => company.authorized)
  companyId: Company;
}
