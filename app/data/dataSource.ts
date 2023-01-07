import { DataSource } from "typeorm";
import { Estate } from "../models/Estate";
import { Location } from "../models/Location";
import 'dotenv/config';
import { Parking } from "../models/Parking";
import { Manager } from "../models/Manager";
import { Seller } from "../models/Seller";
import { Renter } from "../models/Renter";
import { Leaser } from "../models/Leaser";
import { Customer } from "../models/Customer";
export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.PGPORT) || 5432 ,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [Estate,Location,Parking,Manager,Seller,Renter,Leaser,Customer],
});


