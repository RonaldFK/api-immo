import { DataSource } from "typeorm";
import { Estate } from "../models/Estate";
import 'dotenv/config';
export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.PGPORT) || 5432 ,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [Estate],
});


