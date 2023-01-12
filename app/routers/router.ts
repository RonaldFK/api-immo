import express from 'express';
import { estateController } from '../controllers/estateController';
export const router = express.Router();
import { locationController } from '../controllers/locationController';
import {controlSyntaxMiddleware} from '../middlewares/controlSyntaxMiddleware';
import {controlUniqData} from '../middlewares/controlUniqData';
import {customerController} from '../controllers/customerController';

// ESTATE
router.get('/estate',estateController.getAllEstate);
router.get('/estate/:id',controlSyntaxMiddleware.syntaxIdControl,estateController.getOneEstateById);
router.get('/estate/type/:type',controlSyntaxMiddleware.syntaxTypeControl,estateController.getEstateByType);
router.post('/estate',estateController.createEstate);
router.patch('/estate/:id',controlSyntaxMiddleware.syntaxIdControl,estateController.updateOneEstate);
router.delete('/estate/:id',controlSyntaxMiddleware.syntaxIdControl,estateController.deleteOneEstate);

// LOCATION
router.get('/location',locationController.getAllLocation);
router.get('/location/:id',controlSyntaxMiddleware.syntaxIdControl,locationController.getOneLocationById);
router.post('/location',controlUniqData.uniqueDataControl,locationController.createLocation);

// CUSTOMER

router.get('/customer',customerController.getAllCustomer);
router.get('/customer/:id',customerController.getOneController);
// SELLER


