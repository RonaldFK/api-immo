"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.mainRouter = express_1.default.Router();
const index_1 = require("../controllers/index");
const index_2 = require("../middlewares/index");
// ESTATE
exports.mainRouter.get('/estate', index_1.estateController.getAllEstate);
exports.mainRouter.get('/estate/:id', index_2.controlSyntaxMiddleware.syntaxIdControl, index_1.estateController.getOneEstateById);
exports.mainRouter.get('/estate/type/:type', index_2.controlSyntaxMiddleware.syntaxTypeControl, index_1.estateController.getEstateByType);
exports.mainRouter.post('/estate', index_2.controlUniqData.uniqueDataControlEstate, index_1.estateController.createEstate);
exports.mainRouter.patch('/estate/:id', index_2.controlSyntaxMiddleware.syntaxIdControl, index_1.estateController.updateOneEstate);
exports.mainRouter.delete('/estate/:id', index_2.controlSyntaxMiddleware.syntaxIdControl, index_1.estateController.deleteOneEstate);
// LOCATION
exports.mainRouter.get('/location', index_1.locationController.getAllLocation);
exports.mainRouter.get('/location/:id', index_2.controlSyntaxMiddleware.syntaxIdControl, index_1.locationController.getOneLocationById);
exports.mainRouter.post('/location', index_2.controlUniqData.uniqueDataControlLocation, index_1.locationController.createLocation);
exports.mainRouter.patch('/location/:id', index_2.controlSyntaxMiddleware.syntaxIdControl, index_1.locationController.updateOneLocation);
// non pertinent une route pour la supression d'une localisation.
// Il est préférable de passer par un cascade lors de la supression d'un bien en lien avec cette localisation
// CUSTOMER
exports.mainRouter.get('/customer', index_1.customerController.getAllCustomer);
exports.mainRouter.get('/customer/:id', index_2.controlSyntaxMiddleware.syntaxIdControl, index_1.customerController.getOneCustomerById);
exports.mainRouter.get('/customer/type/:type', index_2.controlSyntaxMiddleware.syntaxTypeControl, index_1.customerController.getOneCustomerByType);
exports.mainRouter.post('/customer', index_2.controlUniqData.uniqueDataControlCustomer, index_1.customerController.createCustomer);
exports.mainRouter.patch('/customer/:id', index_2.controlSyntaxMiddleware.syntaxIdControl, index_1.customerController.updateOneCustomer);
exports.mainRouter.delete('/customer/:id', index_2.controlSyntaxMiddleware.syntaxIdControl, index_1.customerController.deleteOneCustomer);
// MANAGER
exports.mainRouter.get('/manager', index_1.managerController.getAllManager);
exports.mainRouter.get('/manager/:id/estate', index_2.controlSyntaxMiddleware.syntaxIdControl, index_1.managerController.getEstateByManager);
exports.mainRouter.get('/manager/:id', index_2.controlSyntaxMiddleware.syntaxIdControl, index_1.managerController.getOneManagerById);
// mainRouter.post('/manager',
//   controlUniqData.uniqueDataControlManager,
//   managerController.createManager);
exports.mainRouter.patch('/manager/:id', index_2.controlSyntaxMiddleware.syntaxIdControl, index_1.managerController.updateOneManager);
exports.mainRouter.delete('/manager/:id', index_2.controlSyntaxMiddleware.syntaxIdControl, index_1.managerController.deleteOneManager);
