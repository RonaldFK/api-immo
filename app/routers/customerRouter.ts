import express from 'express';
export const customerRouter = express.Router();


import { customerController } from '../controllers/index';

import {controlSyntaxMiddleware,
  controlUniqData,
} from '../middlewares/index';

customerRouter.route('/')
  .get(
    customerController.getAllCustomer)

  .post(
    controlUniqData.uniqueDataControlCustomer,
    customerController.createCustomer);

customerRouter.route('/search/:name')
  .get(
    customerController.searchCustomer);

customerRouter.route('/:id')
  .get(
    controlSyntaxMiddleware.syntaxIdControl,
    customerController.getOneCustomerById)

  .patch(
    controlSyntaxMiddleware.syntaxIdControl,
    customerController.updateOneCustomer)

  .delete(
    controlSyntaxMiddleware.syntaxIdControl,
    customerController.deleteOneCustomer);

customerRouter.get('/type/:type',
  controlSyntaxMiddleware.syntaxTypeControl,
  customerController.getOneCustomerByType);


