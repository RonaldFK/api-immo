import express from 'express';
export const router = express.Router();

import { authRouter } from './routerAuth';
import { mainRouter } from './router';
import {error404} from '../middlewares/index';
import { controlToken } from '../middlewares/controlToken';

router.use('/auth',authRouter);
router.use(controlToken.validateToken);
router.use('/',mainRouter);
router.use(error404);

