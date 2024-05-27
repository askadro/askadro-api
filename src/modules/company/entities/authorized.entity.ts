import {
  Column,
  Entity, JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, Relation,
} from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class Authorized {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  authorizedPerson: string;

  @Column()
  authorizedPhone: string;

  @Column()
  authorizedEmail: string;

  @Column()
  authorizedTitle: string;

  @ManyToOne(() => Company, (company: Company) => company.authorized)
  @JoinColumn()
  company: Relation<Company>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;
}
 