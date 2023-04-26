
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Estate } from "./Estate";
import { Manager } from "./Manager";


@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
      id!: number;

    @Column()
      name!:string;

    @Column()
      estate_id?: number;

    @Column()
      manager_id?:number;

    @Column()
      created_at!: Date;

    @Column()
      updated_at!: Date;

    @ManyToOne(() => Manager, (manager) => manager.id)
    @JoinColumn({ name: "manager_id" })
      manager?: Manager;

    @ManyToOne(() => Estate, (estate) => estate.id)
    @JoinColumn({ name: "estate_id" })
      estate?: Estate;
}
