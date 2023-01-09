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
      created_at!: Date;

    @Column()
      updated_at?: Date;

    @OneToOne(() => Location)
    @JoinColumn({ name: "location_id" })
      location?: Location;

}
