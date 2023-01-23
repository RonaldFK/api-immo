import express from 'express';
export const router = express.Router();

import { authRouter } from './routerAuth';
import { mainRouter } from './router';
import {error404} from '../middlewares/index';

router.use('/auth',authRouter);
router.use('/',mainRouter);
router.use(error404);

