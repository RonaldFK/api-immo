import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Unique, ManyToOne } from "typeorm";
import { Customer } from "./Customer";

import { Location } from "./Location";
import { Manager } from "./Manager";


@Entity()
@Unique(["name"])
export class Estate {
    @PrimaryGeneratedColumn()
      id!: number;
  @Column()
    name!: string;

  @Column()
    price!:number;

  @Column()
    type!:string;

  @Column()
    created_at!: Date;

  @Column()
    updated_at?: Date;


  @Column()
    location_id?:number;

  @Column()
    manager_id?:number;

  @Column()
    customer_id?:number;

  @Column()
    date_of_selling?:Date;

  @OneToOne(() => Location, {cascade:true})
  @JoinColumn({ name: "location_id" })
    location?: Location;

  // @OneToOne(() => Parking)
  // @JoinColumn({ name: "parking_id" })
  //   parking?: Parking;

  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: "customer_id" })
    customer?: Customer;

  @ManyToOne(() => Manager, (manager) => manager.id)
  @JoinColumn({ name: "manager_id" })
    manager?: Manager;

}
