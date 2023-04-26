import express from 'express';
export const router = express.Router();

import { authRouter } from './routerAuth';
import {managerRouter} from './managerRouter';
import {customerRouter} from './customerRouter';
import {locationRouter} from './locationRouter';
import {estateRouter} from './estateRouter';
import {error404} from '../middlewares/index';
import { controlToken } from '../middlewares/controlToken';
import {statisticsRouter} from './statisticsRouter';
// import {docRouter} from './docRouter';


router.use('/auth',authRouter);
router.use('/estate',estateRouter);
// router.use('/docs',docRouter);
// router.use(controlToken.validateToken);
router.use('/statistics',statisticsRouter);
router.use('/manager',managerRouter);
router.use('/customer',customerRouter);
router.use('/location',locationRouter);
router.use(error404);

