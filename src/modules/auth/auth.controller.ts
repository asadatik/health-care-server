import { Request, Response } from "express";


import httpStatus from "http-status";




import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AuthService } from "./auth.service";

//createPatient 
const login = catchAsync(async (req: Request, res: Response) => {
    
console.log("req.body", req.file);


    const result = await AuthService.login(req.body);

   const { accessToken , refreshToken } = result;

  res.cookie("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60,
  });
  res.cookie("refreshToken", refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });



    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "user login  successfully!",
        data: result,
    })
   
});




export const authController = {


    login


}