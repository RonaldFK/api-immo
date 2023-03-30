import express from 'express';
export const statisticsRouter = express.Router();

import {statController} from '../controllers/statController';

statisticsRouter.get('/allEstate',
  statController.getEstate);

statisticsRouter.get('/estateSold',
  statController.getEstate);

statisticsRouter.get('/estateMonth',
  statController.getMonth);
