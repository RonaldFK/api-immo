import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";

@Entity()
export class Seller {
    @PrimaryGeneratedColumn()
      id!:number;

    @Column()
      customer_id!:number;

    // @OneToMany(() => Customer, (customer) => customer.id)
    // @JoinColumn({ name: "customer_id" })
    //   customers?: Customer;

    @OneToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
      customer?: Customer;
}

