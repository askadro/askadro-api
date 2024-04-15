import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
@PrimaryGeneratedColumn()
id:string

@Column()
firstname:string


@Column()
lastname:string

//age, birthday, sex, location, tc, phone, manager, 
//auth:["admin","manager","user:default","owner"],
//status:[busy...], extraMoney
}


// global günlük ücret çalışma saati, ödeme günleri