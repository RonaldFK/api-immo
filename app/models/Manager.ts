import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
      created_at!: Date;

  @Column()
    updated_at?: Date;

}
