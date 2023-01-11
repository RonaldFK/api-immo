
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Location {
    @PrimaryGeneratedColumn()
      id!: number;

    @Column()
      num!:number;

    @Column()
      street!: string;

    @Column()
      city!:string;

    @Column()
      country!:string;

    @Column()
      code!:number;

    @Column()
      created_at!: Date;

    @Column()
      updated_at!: Date;
}
