import express from 'express';
export const statisticsRouter = express.Router();

import {statController} from '../controllers/statController';

statisticsRouter.get('/allEstate',
  statController.getEstateToSell);

statisticsRouter.get('/estateSold',
  statController.getEstateSoldOut);


