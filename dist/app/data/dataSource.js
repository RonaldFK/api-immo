"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const Estate_1 = require("../models/Estate");
const Location_1 = require("../models/Location");
require("dotenv/config");
const Parking_1 = require("../models/Parking");
const Manager_1 = require("../models/Manager");
const Seller_1 = require("../models/Seller");
const Renter_1 = require("../models/Renter");
const Leaser_1 = require("../models/Leaser");
const Customer_1 = require("../models/Customer");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: Number(process.env.PGPORT) || 5432,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    entities: [Estate_1.Estate, Location_1.Location, Parking_1.Parking, Manager_1.Manager, Seller_1.Seller, Renter_1.Renter, Leaser_1.Leaser, Customer_1.Customer],
});
