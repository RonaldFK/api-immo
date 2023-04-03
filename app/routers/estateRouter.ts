import express from 'express';
export const estateRouter = express.Router();


import { estateController } from '../controllers/index';
import { uploadFile } from '../middlewares/uploadFile';
import {controlSyntaxMiddleware,
  controlUniqData,
} from '../middlewares/index';
import { controlToken } from '../middlewares/controlToken';


estateRouter.get('/:id/photo/:name',
  controlSyntaxMiddleware.syntaxTypeControl,
  estateController.getPhoto);

// estateRouter.use(controlToken.validateToken);

estateRouter.route('/')
  .get(estateController.getAllEstate)

  .post(uploadFile,
    controlUniqData.uniqueDataControlEstate,
    estateController.createEstate
  );

estateRouter.route('/:id')
  .get(
    controlSyntaxMiddleware.syntaxIdControl,
    estateController.getOneEstateById)

  .patch(uploadFile,
    controlSyntaxMiddleware.syntaxIdControl,
    estateController.updateOneEstate)

  .delete(
    controlSyntaxMiddleware.syntaxIdControl,
    estateController.deleteOneEstate);

estateRouter.get('/type/:type',
  controlSyntaxMiddleware.syntaxTypeControl,
  estateController.getEstateByType);



