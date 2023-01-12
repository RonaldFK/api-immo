import express from 'express';
import { estateController } from '../controllers/estateController';
export const mainRouter = express.Router();
import { locationController } from '../controllers/locationController';
import {controlSyntaxMiddleware} from '../middlewares/controlSyntaxMiddleware';
import {controlUniqData} from '../middlewares/controlUniqData';
import {customerController} from '../controllers/customerController';
import { sellerController } from '../controllers/sellerController';
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

// mainRouter.delete('/location/:id',
//   controlSyntaxMiddleware.syntaxIdControl,
//   locationController.deleteOneLocation);

// CUSTOMER

mainRouter.get('/customer',
  customerController.getAllCustomer);

mainRouter.get('/customer/:id',
  controlSyntaxMiddleware.syntaxIdControl,
  customerController.getOneCustomer);

mainRouter.post('/customer',
  controlUniqData.uniqueDataControlCustomer,
  customerController.createCustomer);


// SELLER

mainRouter.get('/seller',
  sellerController.getAllSeller);

