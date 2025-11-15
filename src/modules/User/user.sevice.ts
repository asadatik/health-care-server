
import { Request } from 'express';
import { fileUploader } from '../../app/helper/fileUploader';
import prisma from '../../shared/prisma';
import { CreatePatientRequest } from './user.interface';
import bcrypt from 'bcryptjs';


//
const createPatient = async (req : Request) => {
console.log("Payload:", req.file);

if(req.file){ 
  const uploadResult = await fileUploader.uploadToCloudinary(req.file);
  req.body.patient.profilePhoto =  uploadResult?.secure_url;
}


  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const result =    await prisma.$transaction(async (txn) => {
    await txn.user.create({
      data: {
        email: req.body.patient.email,
        password: hashedPassword,
      },
    });



    return  await txn.patient.create({
      data:  req.body.patient
    });
      
  });

  return result;
  
}

export const userService = {
  createPatient,
};