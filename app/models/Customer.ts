import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
      tel!:number;

    @Column()
      cash_or_credit!:string;

    @Column()
      date_of_selling?:Date;

      @Column()
        type_customer_id?:number;

    @Column()
      created_at!: Date;

    @Column()
      updated_at?: Date;


    @ManyToOne(_type => Seller, seller => seller.customer_id)
    @JoinColumn({ name: 'type_customer_id' })
      seller?: Seller;

}
// @ManyToOne(type => Datasource, datasource => datasource. actions)
//     @JoinColumn({ name: 'id_datasource' })
//     datasource: Datasource;
