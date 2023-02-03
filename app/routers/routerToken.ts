import express from 'express';
import { tokenController } from '../controllers/tokenController';

export const routerToken = express.Router();


// routerToken.post('/gentoken',tokenController.genToken);
routerToken.get('/validatetoken',tokenController.validateToken);

