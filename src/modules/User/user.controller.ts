import { Request, Response } from "express";
import { userService } from "./user.sevice";

import httpStatus from "http-status";




import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { userFilterableFields } from "./user.constant";
import pick from "../../shared/pick";

//createPatient 
const createPatient = catchAsync(async (req: Request, res: Response) => {
    
console.log("req.body", req.file);


    const result = await userService.createPatient(req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Patient Created successfully!",
        data: result,
    })
   
});

//get all user from db 

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, userFilterableFields) // searching , filtering
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]) // pagination and sorting

    const result = await userService.getAllFromDB(filters, options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User retrieve successfully!",
        meta: result.meta,
        data: result.data
    })
})


export const userController = {
 
    createPatient  ,
getAllFromDB

}