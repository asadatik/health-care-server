import { Request, Response } from "express";
import { userService } from "./user.sevice";

import httpStatus from "http-status";




import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

//createPatient 
const createPatient = catchAsync(async (req: Request, res: Response) => {

    const result = await userService.createPatient(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Patient Created successfuly!",
        data: result
    })
});

export const userController = {
 
    createPatient 


}