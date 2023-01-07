import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Seller } from "./Seller";

@Entity()

export class Customer{
    @PrimaryGeneratedColumn()
      id!:number;
    @Column()
      firstname!:string;

    @Column()
      lastname!:string;

    @Column()
      tel!:string;

    @Column()
      cash_or_credit!:string;

    @Column()
      date_of_selling?:Date;

    @Column()
      created_at!: Date;

    @Column()
      updated_at?: Date;

    @ManyToOne(() => Seller, (seller) => seller.id)
      seller?: Seller;

}
