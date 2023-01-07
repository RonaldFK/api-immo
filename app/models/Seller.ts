import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";

@Entity()
export class Seller {
    @PrimaryGeneratedColumn()
      id!:number;

    @Column()
      customer_id!:number;

      @OneToMany(() => Customer, (customer) => customer.id)
        customers!: Customer[];

  //   @OneToMany(() => Customer, (customer) => customer.id)
  // customers?: Customer[];
}


