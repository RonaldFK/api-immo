"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
const estateController_1 = require("../controllers/estateController");
exports.mainRouter = express_1.default.Router();
const locationController_1 = require("../controllers/locationController");
const controlSyntaxMiddleware_1 = require("../middlewares/controlSyntaxMiddleware");
const controlUniqData_1 = require("../middlewares/controlUniqData");
const customerController_1 = require("../controllers/customerController");
const managerController_1 = require("../controllers/managerController");
const error404_1 = require("../middlewares/error404");
// ESTATE
exports.mainRouter.get('/estate', estateController_1.estateController.getAllEstate);
exports.mainRouter.get('/estate/:id', controlSyntaxMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, estateController_1.estateController.getOneEstateById);
exports.mainRouter.get('/estate/type/:type', controlSyntaxMiddleware_1.controlSyntaxMiddleware.syntaxTypeControl, estateController_1.estateController.getEstateByType);
exports.mainRouter.post('/estate', controlUniqData_1.controlUniqData.uniqueDataControlEstate, estateController_1.estateController.createEstate);
exports.mainRouter.patch('/estate/:id', controlSyntaxMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, estateController_1.estateController.updateOneEstate);
exports.mainRouter.delete('/estate/:id', controlSyntaxMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, estateController_1.estateController.deleteOneEstate);
// LOCATION
exports.mainRouter.get('/location', locationController_1.locationController.getAllLocation);
exports.mainRouter.get('/location/:id', controlSyntaxMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, locationController_1.locationController.getOneLocationById);
exports.mainRouter.post('/location', controlUniqData_1.controlUniqData.uniqueDataControlLocation, locationController_1.locationController.createLocation);
exports.mainRouter.patch('/location/:id', controlSyntaxMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, locationController_1.locationController.updateOneLocation);
// non pertinent une route pour la supression d'une localisation.
// Il est préférable de passer par un cascade lors de la supression d'un bien en lien avec cette localisation
// CUSTOMER
exports.mainRouter.get('/customer', customerController_1.customerController.getAllCustomer);
exports.mainRouter.get('/customer/:id', controlSyntaxMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, customerController_1.customerController.getOneCustomerById);
exports.mainRouter.get('/customer/type/:type', controlSyntaxMiddleware_1.controlSyntaxMiddleware.syntaxTypeControl, customerController_1.customerController.getOneCustomerByType);
exports.mainRouter.post('/customer', controlUniqData_1.controlUniqData.uniqueDataControlCustomer, customerController_1.customerController.createCustomer);
exports.mainRouter.patch('/customer/:id', controlSyntaxMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, customerController_1.customerController.updateOneCustomer);
exports.mainRouter.delete('/customer/:id', controlSyntaxMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, customerController_1.customerController.deleteOneCustomer);
// MANAGER
exports.mainRouter.get('/manager', managerController_1.managerController.getAllManager);
exports.mainRouter.get('/manager/:id/estate', controlSyntaxMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, managerController_1.managerController.getEstateByManager);
exports.mainRouter.get('/manager/:id', controlSyntaxMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, managerController_1.managerController.getOneManagerById);
exports.mainRouter.post('/manager', controlUniqData_1.controlUniqData.uniqueDataControlManager, managerController_1.managerController.createManager);
exports.mainRouter.patch('/manager/:id', controlSyntaxMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, managerController_1.managerController.updateOneManager);
exports.mainRouter.delete('/manager/:id', controlSyntaxMiddleware_1.controlSyntaxMiddleware.syntaxIdControl, managerController_1.managerController.deleteOneManager);
exports.mainRouter.use(error404_1.error404);
