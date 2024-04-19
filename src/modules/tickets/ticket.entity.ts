import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.ticket)
  user: User;

  @Column({ default: 0 })
  waiter: number;

  @Column({ default: 0 })
  cleaner: number;

  @Column({ default: 0 })
  hostess: number;

  @Column({ default: 0 })
  chef: number;
}