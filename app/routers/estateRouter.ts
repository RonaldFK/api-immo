import express from 'express';
export const estateRouter = express.Router();


import { estateController } from '../controllers/index';

import {controlSyntaxMiddleware,
  controlUniqData,
} from '../middlewares/index';


estateRouter.route('/estate')
  .get(estateController.getAllEstate)

  .post(
    controlUniqData.uniqueDataControlEstate,
    estateController.createEstate);

estateRouter.route('/estate/:id')
  .get(
    controlSyntaxMiddleware.syntaxIdControl,
    estateController.getOneEstateById)

  .patch(
    controlSyntaxMiddleware.syntaxIdControl,
    estateController.updateOneEstate)

  .delete(
    controlSyntaxMiddleware.syntaxIdControl,
    estateController.deleteOneEstate);

estateRouter.get('/estate/type/:type',
  controlSyntaxMiddleware.syntaxTypeControl,
  estateController.getEstateByType);

estateRouter.get('/estate/:id/:photo',
  controlSyntaxMiddleware.syntaxTypeControl,
  estateController.getPhoto);


