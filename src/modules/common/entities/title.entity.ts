import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TITLES } from '@/enums/titles';


@Entity()
export class Title {
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column()
  title: string;

  @Column()
  label:string
}