import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Unique } from "typeorm";

import { Location } from "./Location";
import { Parking } from "./Parking";

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
    parking_id?:number;

  @Column()
    manager_id?:number;

  @Column()
    customer_id?:number;

  @OneToOne(() => Location)
  @JoinColumn({ name: "location_id" })
    location?: Location;

  @OneToOne(() => Parking)
  @JoinColumn({ name: "parking_id" })
    parking?: Parking;


}
