import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Estate } from "./Estate";

@Entity()

export class Manager{
    @PrimaryGeneratedColumn()
      id!:number;
    @Column()
      firstname!:string;

    @Column()
      lastname!:string;

    @Column()
      password!:string;

    @Column()
      login!:string;

    @Column()
      email!:string;

    @Column()
      admin!:boolean;

    @Column()
      created_at!: Date;

  @Column()
    updated_at?: Date;
  // @Column()
  //   img!:BinaryType;

  @OneToMany(() => Estate, (estate) => estate.customer_id)
    estate?: Estate[];

}
