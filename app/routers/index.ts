import express from 'express';
export const router = express.Router();

// import { mainRouter } from './mainRouter';
import { authRouter } from './routerAuth';
import {managerRouter} from './managerRouter';
import {customerRouter} from './customerRouter';
import {locationRouter} from './locationRouter';
import {estateRouter} from './estateRouter';
import {error404} from '../middlewares/index';
import { controlToken } from '../middlewares/controlToken';





// router.use('/',mainRouter);
router.use('/auth',authRouter);
// router.use(controlToken.validateToken);
router.use('/estate',estateRouter);
router.use('/manager',managerRouter);
router.use('/customer',customerRouter);
router.use('/location',locationRouter);
router.use(error404);

