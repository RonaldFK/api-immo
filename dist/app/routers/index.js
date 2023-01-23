"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const routerAuth_1 = require("./routerAuth");
const router_1 = require("./router");
const index_1 = require("../middlewares/index");
exports.router.use('/auth', routerAuth_1.authRouter);
exports.router.use('/', router_1.mainRouter);
exports.router.use(index_1.error404);
