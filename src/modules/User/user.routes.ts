import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';



const router = express.Router();

router.post('/add-patient', (req: Request, res: Response, next: NextFunction) => {
    return userController.createPatient(req, res, next);
});



export const userRoutes = router;