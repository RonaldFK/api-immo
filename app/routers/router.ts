import express from 'express';
import { estateController } from '../controllers/estateController';
export const mainRouter = express.Router();
import { locationController } from '../controllers/locationController';
import {controlSyntaxMiddleware} from '../middlewares/controlSyntaxMiddleware';
import {controlUniqData} from '../middlewares/controlUniqData';
import {customerController} from '../controllers/customerController';
import { managerController } from '../controllers/managerController';
import { error404 } from '../middlewares/error404';
// ESTATE
mainRouter.get('/estate',estateController.getAllEstate);

mainRouter.get('/estate/:id',
  controlSyntaxMiddleware.syntaxIdControl,
  estateController.getOneEstateById);

mainRouter.get('/estate/type/:type',
  controlSyntaxMiddleware.syntaxTypeControl,
  estateController.getEstateByType);

mainRouter.post('/estate',
  controlUniqData.uniqueDataControlEstate,
  estateController.createEstate);

mainRouter.patch('/estate/:id',
  controlSyntaxMiddleware.syntaxIdControl,
  estateController.updateOneEstate);

mainRouter.delete('/estate/:id',
  controlSyntaxMiddleware.syntaxIdControl,
  estateController.deleteOneEstate);

// LOCATION
mainRouter.get('/location',
  locationController.getAllLocation);

mainRouter.get('/location/:id',
  controlSyntaxMiddleware.syntaxIdControl,
  locationController.getOneLocationById);

mainRouter.post('/location',
  controlUniqData.uniqueDataControlLocation,
  locationController.createLocation);

mainRouter.patch('/location/:id',
  controlSyntaxMiddleware.syntaxIdControl,
  locationController.updateOneLocation);

// non pertinent une route pour la supression d'une localisation.
// Il est préférable de passer par un cascade lors de la supression d'un bien en lien avec cette localisation


// CUSTOMER

mainRouter.get('/customer',
  customerController.getAllCustomer);

mainRouter.get('/customer/:id',
  controlSyntaxMiddleware.syntaxIdControl,
  customerController.getOneCustomerById);


mainRouter.get('/customer/type/:type',
  controlSyntaxMiddleware.syntaxTypeControl,
  customerController.getOneCustomerByType);

mainRouter.post('/customer',
  controlUniqData.uniqueDataControlCustomer,
  customerController.createCustomer);

mainRouter.patch('/customer/:id',
  controlSyntaxMiddleware.syntaxIdControl,
  customerController.updateOneCustomer);

mainRouter.delete('/customer/:id',
  controlSyntaxMiddleware.syntaxIdControl,
  customerController.deleteOneCustomer);

// MANAGER

mainRouter.get('/manager',
  managerController.getAllManager);

mainRouter.get('/manager/:id',
  controlSyntaxMiddleware.syntaxIdControl,
  managerController.getOneManagerById);

mainRouter.post('/manager',
  controlUniqData.uniqueDataControlManager,
  managerController.createManager);

mainRouter.patch('/manager/:id',
  controlSyntaxMiddleware.syntaxIdControl,
  managerController.updateOneManager);

mainRouter.delete('/manager/:id',
  controlSyntaxMiddleware.syntaxIdControl,
  managerController.deleteOneManager);

mainRouter.use(error404);
