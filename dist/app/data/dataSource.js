"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const Estate_1 = require("../models/Estate");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "apiadmin",
    password: "admin",
    database: "api",
    entities: [Estate_1.Estate],
});
