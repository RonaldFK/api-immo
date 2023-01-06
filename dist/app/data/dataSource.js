"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const Estate_1 = require("../models/Estate");
require("dotenv/config");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: Number(process.env.PGPORT) || 5432,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    entities: [Estate_1.Estate],
});
