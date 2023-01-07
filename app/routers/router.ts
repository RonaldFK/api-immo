import express from 'express';
import { estateController } from '../controllers/estateController';
import { locationController } from '../controllers/locationController';
export const router = express.Router();


// GET, POST, PATCH , DELETE
// ESTATE
router.get('/estate',estateController.getAllEstate);
router.get('/estate/:id',estateController.getOneEstate);

// LOCATION

router.get('/location',locationController.getAllLocation);
