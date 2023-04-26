import express from 'express';
export const locationRouter = express.Router();


import { locationController } from '../controllers/index';

import {controlSyntaxMiddleware,
  controlUniqData,
} from '../middlewares/index';


// LOCATION
locationRouter.route('/')
  .get( locationController.getAllLocation)

  .post(
    controlUniqData.uniqueDataControlLocation,
    locationController.createLocation);

locationRouter.route('/:id')
  .get(
    controlSyntaxMiddleware.syntaxIdControl,
    locationController.getOneLocationById)

  .patch(
    controlSyntaxMiddleware.syntaxIdControl,
    locationController.updateOneLocation);

// non pertinent une route pour la supression d'une localisation.
// Il est préférable de passer par un cascade lors de la supression d'un bien en lien avec cette localisation
