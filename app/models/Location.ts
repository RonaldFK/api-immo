
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Location {
    @PrimaryGeneratedColumn()
      id!: number;
    @Column()
      street!: string;

    @Column()
      city!:number;

    @Column()
      country!:string;

    @Column()
      code!:number;

    @Column()
      created_at!: Date;

    @Column()
      updated_at!: Date;
}
