"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
require("reflect-metadata");
const app = (0, express_1.default)();
const dataSource_1 = require("./app/data/dataSource");
const router_1 = require("./app/routers/router");
dataSource_1.dataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
const port = process.env.PORT || 3000;
app.use(router_1.router);
app.listen(port, () => {
    console.log(`server launched on port : ${port}`);
});
