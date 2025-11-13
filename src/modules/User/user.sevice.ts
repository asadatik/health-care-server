
import { Request } from 'express';
import { fileUploader } from '../../app/helper/fileUploader';
import prisma from '../../shared/prisma';
import { CreatePatientRequest } from './user.interface';
import bcrypt from 'bcryptjs';


//
const createPatient = async (req : Request) => {
console.log("Payload:", req.body);

if(req.file){ 
  const uploadResult = await fileUploader.uploadToCloudinary(req.file);
  console.log({uploadResult});
}






//   const hashedPassword = await bcrypt.hash(payload.password, 10);

//   await prisma.$transaction(async (txn) => {
//     await txn.user.create({
//       data: {
//         email: payload.email,
//         password: hashedPassword,
//       },
//     });
//   });
}

export const userService = {
  createPatient,
};