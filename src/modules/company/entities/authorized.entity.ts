import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  authorizedTitle: string;

  @ManyToOne(() => Company, (company: Company) => company.authorized)
  company: Company;
}
 