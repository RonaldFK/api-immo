import { DataSource } from "typeorm";
import { Estate } from "../models/Estate";
export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "apiadmin",
  password: "admin",
  database: "api",
  entities: [Estate],
});


