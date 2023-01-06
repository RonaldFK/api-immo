import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Location } from "./Location";
@Entity()
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
      updated_at!: Date;
    @OneToOne(() => Location)
    @JoinColumn()
      location?: Location;

}
