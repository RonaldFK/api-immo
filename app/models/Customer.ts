import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Estate } from "./Estate";

@Entity()

export class Customer{
    @PrimaryGeneratedColumn()
      id!:number;
    @Column()
      firstname!:string;

    @Column()
      lastname!:string;

    @Column()
      tel!:number;

    @Column()
      cash_or_credit!:string;

    @Column()
      date_of_selling?:Date;

    @Column()
      type_of_customer?:string;


    @Column()
      created_at!: Date;

    @Column()
      updated_at?: Date;

    @OneToMany(() => Estate, (estate) => estate.customer_id)
      estate?: Estate[];


}
