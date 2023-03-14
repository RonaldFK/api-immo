import express from 'express';
export const locationRouter = express.Router();


import { locationController } from '../controllers/index';

import {controlSyntaxMiddleware,
  controlUniqData,
} from '../middlewares/index';


// LOCATION
locationRouter.get('/location',
  locationController.getAllLocation);

locationRouter.get('/location/:id',
  controlSyntaxMiddleware.syntaxIdControl,
  locationController.getOneLocationById);

locationRouter.post('/location',
  controlUniqData.uniqueDataControlLocation,
  locationController.createLocation);

locationRouter.patch('/location/:id',
  controlSyntaxMiddleware.syntaxIdControl,
  locationController.updateOneLocation);

// non pertinent une route pour la supression d'une localisation.
// Il est préférable de passer par un cascade lors de la supression d'un bien en lien avec cette localisation
