"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerToken = void 0;
const express_1 = __importDefault(require("express"));
const tokenController_1 = require("../controllers/tokenController");
exports.routerToken = express_1.default.Router();
exports.routerToken.post('/gentoken', tokenController_1.tokenController.genToken);
exports.routerToken.get('/validatetoken', tokenController_1.tokenController.validateToken);
