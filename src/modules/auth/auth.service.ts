import { UserStatus } from "@prisma/client";
import prisma from "../../shared/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtHelpers } from "../../app/helper/jwthelper";
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


  const accessToken =  jwtHelpers.generateToken ( { email: user.email , role : user.role     }   ,  process.env.JWT_SECRET as string  , process.env.JWT_EXPIRES_IN as string   )  ;
 
  const refreshToken =  jwtHelpers.generateToken  ( { email: user.email , role : user.role     }   ,  process.env.JWT_REFRESH_SECRET as string    , '90d'  )  ;
 



  return  { accessToken, refreshToken };
  
}




export const AuthService  = {
    login
}