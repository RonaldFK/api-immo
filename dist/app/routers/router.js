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
exports.router.get('/estate/:id', estateController_1.estateController.getOneEstateById);
exports.router.get('/estate/type/:type', estateController_1.estateController.getEstateByType);
exports.router.post('/estate', estateController_1.estateController.createEstate);
exports.router.patch('/estate/:id', estateController_1.estateController.updateEstate);
exports.router.delete('/estate/:id', estateController_1.estateController.deleteEstate);
// LOCATION
exports.router.get('/location', locationController_1.locationController.getAllLocation);
