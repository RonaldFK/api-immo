import express from 'express';
export const managerRouter = express.Router();

import { managerController } from '../controllers/index';
import {controlSyntaxMiddleware} from '../middlewares/index';

managerRouter.get('/',
  managerController.getAllManager);

managerRouter.get('/:id/estate',
  controlSyntaxMiddleware.syntaxIdControl,
  managerController.getEstateByManager);

managerRouter.route('/:id')
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

