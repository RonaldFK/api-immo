import express from 'express';
export const router = express.Router();

import { authRouter } from './routerAuth';
import {managerRouter} from './managerRouter';
import {error404} from '../middlewares/index';
import { controlToken } from '../middlewares/controlToken';





router.use('/auth',authRouter);
// router.use(controlToken.validateToken);
router.use('/estate',authRouter);
router.use('/manager',managerRouter);
router.use('/customer',authRouter);
router.use('/location',authRouter);
router.use('/',mainRouter);
router.use(error404);

