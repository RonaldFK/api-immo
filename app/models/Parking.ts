import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "./Location";
@Entity()
export class Parking {
    @PrimaryGeneratedColumn()
      id!:number;

    @Column()
      name!:string;

    @Column()
      price!:number;

    @Column()
      manager_id?:number;

    @Column()
      customer_id?:number;

    @Column()
      created_at!: Date;

    @Column()
      updated_at?: Date;

    @OneToOne(() => Location, {cascade:true})

    @JoinColumn({ name: "location_id" })
      location?: Location;


}



