"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const estateController_1 = require("../controllers/estateController");
exports.router = express_1.default.Router();
const locationController_1 = require("../controllers/locationController");
const controlIdMiddleware_1 = require("../middlewares/controlIdMiddleware");
// GET, POST, PATCH , DELETE
// ESTATE
exports.router.get('/estate', estateController_1.estateController.getAllEstate);
exports.router.get('/estate/:id', controlIdMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, estateController_1.estateController.getOneEstateById);
exports.router.get('/estate/type/:type', controlIdMiddleware_1.controlSyntaxMiddleware.syntaxTypeControl, estateController_1.estateController.getEstateByType);
exports.router.post('/estate', estateController_1.estateController.createEstate);
exports.router.patch('/estate/:id', controlIdMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, estateController_1.estateController.updateOneEstate);
exports.router.delete('/estate/:id', controlIdMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, estateController_1.estateController.deleteOneEstate);
// LOCATION
exports.router.get('/location', locationController_1.locationController.getAllLocation);
exports.router.get('/location/:id', controlIdMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, locationController_1.locationController.getOneLocationById);
