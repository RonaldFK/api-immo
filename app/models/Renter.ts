import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";

@Entity()
export class Renter {
    @PrimaryGeneratedColumn()
      id!:number;

    @Column()
      customer_id!:number;

    @OneToMany(() => Customer, (customer) => customer.id)
      customers?: Customer[];
}
