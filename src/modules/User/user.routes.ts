import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { fileUploader } from '../../app/helper/fileUploader';
import { UserValidation } from './user.validation';



const router = express.Router();

//
router.post(
    "/create-patient",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
       req.body = UserValidation.createPatient.parse(JSON.parse(req.body.data))
        return userController.createPatient(req, res, next)
    }
);


// get all usr

router.get ( 
    "/" ,
     userController.getAllFromDB
)




export const userRoutes = router;