import express from 'express';
export const tchatRouter = express.Router();



// import {controlSyntaxMiddleware,
//   controlUniqData,
// } from '../middlewares/index';
import {tchatController} from '../controllers/tchatController';


tchatRouter.get('/',

  tchatController.test);


