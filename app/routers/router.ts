import express from 'express';
import { estateController } from '../controllers/estateController';
export const router = express.Router();
import { locationController } from '../controllers/locationController';
import {controlSyntaxMiddleware} from '../middlewares/controlIdMiddleware';


// GET, POST, PATCH , DELETE
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
