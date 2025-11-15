import { UserStatus } from "@prisma/client";
import prisma from "../../shared/prisma";
import bcrypt from "bcryptjs";

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




}




export const AuthService  = {
    login
}