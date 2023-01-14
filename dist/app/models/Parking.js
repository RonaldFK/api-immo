"use strict";
// import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Customer } from "./Customer";
// import { Location } from "./Location";
// import { Manager } from "./Manager";
// @Entity()
// export class Parking {
//     @PrimaryGeneratedColumn()
//       id!:number;
//     @Column()
//       name!:string;
//     @Column()
//       price!:number;
//     @Column()
//       manager_id?:number;
//     @Column()
//       customer_id?:number;
//     @Column()
//       created_at!: Date;
//     @Column()
//       updated_at?: Date;
//     @OneToOne(() => Location, {cascade:true})
//     @JoinColumn({ name: "location_id" })
//       location?: Location;
//     @ManyToOne(() => Customer, (customer) => customer.id)
//     @JoinColumn({ name: "customer_id" })
//       customer?: Customer;
//     @ManyToOne(() => Manager, (manager) => manager.id)
//     @JoinColumn({ name: "manager_id" })
//       manager?: Manager;
// }
