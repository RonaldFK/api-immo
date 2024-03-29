import { DataSource } from "typeorm";
import { Estate } from "../models/Estate";
import { Location } from "../models/Location";
import 'dotenv/config';
import { Manager } from "../models/Manager";
import { Customer } from "../models/Customer";
import { Photo } from "../models/Photo";


export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.PGPORT) || 5432 ,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [Estate,Location,Manager,Customer,Photo],
});


