"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const express_1 = __importDefault(require("express"));
exports.routerAuth = express_1.default.Router();
exports.routerAuth.get('/', (req, res) => {
    res.json('test nouvelle route');
    console.log('test');
});
