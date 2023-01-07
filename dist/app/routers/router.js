"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const estateController_1 = require("../controllers/estateController");
const locationController_1 = require("../controllers/locationController");
exports.router = express_1.default.Router();
// GET, POST, PATCH , DELETE
// ESTATE
exports.router.get('/estate', estateController_1.estateController.getAllEstate);
exports.router.get('/estate/:id', estateController_1.estateController.getOneEstate);
// LOCATION
exports.router.get('/location', locationController_1.locationController.getAllLocation);
