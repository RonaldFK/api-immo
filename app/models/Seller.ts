import { Column, Entity, JoinColumn, OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";

@Entity()
export class Seller {
    @PrimaryGeneratedColumn()
      id!:number;

    @Column()
      customer_id!:number;

    @OneToMany(() => Customer, (customer) => customer.seller)
    @JoinColumn({ name: "customer_id" })
      customer?: Customer;

  //   @OneToOne(() => Customer)
  //  @JoinColumn({ name: "customer_id" })
  //     customer?: Customer;
}

