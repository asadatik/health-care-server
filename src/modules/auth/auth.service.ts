import { UserStatus } from "@prisma/client";
import prisma from "../../shared/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//
const login = async ( payload : { email : string , password : string } ) => { 

console.log( 'AuthService.login called with payload:', payload );

const user  = await prisma.user.findUniqueOrThrow( {
    where : { email : payload.email ,
              status : UserStatus.ACTIVE


     } 
      
} );


const isPasswordMatched =  await  bcrypt.compare(payload.password, user.password);

if (!isPasswordMatched) {
    throw new Error('Invalid password'); 
}


  const accessToken =  jwt.sign  ( { email: user.email , role : user.role     }   ,  process.env.JWT_SECRET as string    ,  {
    algorithm : "HS256" ,
    expiresIn : "1h"
  }  )  ;
 


  return  { accessToken };
}




export const AuthService  = {
    login
}