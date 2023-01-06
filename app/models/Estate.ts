import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Estate {
    @PrimaryGeneratedColumn()
      id!: number;
    @Column()
      name!: string;

    @Column()
      price!:number;

    @Column()
      created_at!: Date;

    @Column()
      updated_at!: Date;

}
