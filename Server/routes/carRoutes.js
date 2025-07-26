import express from 'express';
import * as carController from '../controllers/carController.js';
import upload from '../engine/Agents/UPIFM.js';


const router = express.Router();

router.post('/uploadCar', upload.single('image'), carController.createCarController);


export default router;
