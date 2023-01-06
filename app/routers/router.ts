import express from 'express';
import { estateController } from '../controllers/estateController';

export const router = express.Router();


// GET, POST, PATCH , DELETE
router.get('/estate',estateController.getAllEstate);
