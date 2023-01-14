"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const Estate_1 = require("../models/Estate");
const Location_1 = require("../models/Location");
require("dotenv/config");
const Manager_1 = require("../models/Manager");
const Customer_1 = require("../models/Customer");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: Number(process.env.PGPORT) || 5432,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    entities: [Estate_1.Estate, Location_1.Location, Manager_1.Manager, Customer_1.Customer],
});
