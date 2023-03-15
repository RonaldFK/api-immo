import express from 'express';
export const managerRouter = express.Router();

import { managerController } from '../controllers/index';
import {controlSyntaxMiddleware} from '../middlewares/index';

managerRouter.get('/manager',
  managerController.getAllManager);

managerRouter.get('/manager/:id/estate',
  controlSyntaxMiddleware.syntaxIdControl,
  managerController.getEstateByManager);

managerRouter.route('/manager/:id')
  .get(
    controlSyntaxMiddleware.syntaxIdControl,
    managerController.getOneManagerById)

  .patch(
    controlSyntaxMiddleware.syntaxIdControl,
    managerController.updateOneManager)

  .delete(
    controlSyntaxMiddleware.syntaxIdControl,
    managerController.deleteOneManager);


// managerRouter.post('/manager',
//   controlUniqData.uniqueDataControlManager,
//   managerController.createManager);

