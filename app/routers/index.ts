import express from 'express';
export const router = express.Router();

import { authRouter } from './routerAuth';
import { mainRouter } from './router';
import {error404} from '../middlewares/index';
import { routerToken } from './routerToken';


router.use('/auth',authRouter);
router.use('/token',routerToken);
router.use('/',mainRouter);
router.use(error404);

