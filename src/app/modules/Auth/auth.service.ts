
import config from "../../config";
import { Usermodel } from "../User/user.models";
import AppError from "./AppError";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const loginUser=async(payload:TLoginUser)=>{
   
console.log(payload);
// checking if user exist or not
const isUserExist=await Usermodel.findOne({email:payload?.email})
console.log(isUserExist);
if(!isUserExist){
    throw new AppError( 401,'user does not exis',);
//    
// return {
//     success: false,
//     message: 'Invalid credentials',
//     statusCode: 401,
//     error:'user is not exist',
//     stack:"error-stack"
//   };
}
const status=isUserExist?.isBlocked
if(status===true){
    throw new AppError( 401,'user already blocked',);
    // return {
    //     success: false,
    //     message: 'Invalid credentials',
    //     statusCode: 401,
    //     error:'user is already blocked',
    //     stack:"error-stack"
    //   };
}
// checking if the password is correct or not
const isPasswordMatched= await bcrypt.compare(payload?.password,isUserExist?.password)
console.log(isPasswordMatched);

if(!isPasswordMatched){
    throw new AppError( 401,'invalid credintials');
    // return {
    //     success: false,
    //     message: 'Invalid credentials',
    //     statusCode: 401,
    //     error:'invalid password',
    //     stack:"error-stack"
    //   };
}
const jwtPayload={
    email:isUserExist?.email,
    role:isUserExist?.role,
    id:isUserExist?._id
}
const token=jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '20d' });
 

return{
    token
}
    }

export const AuthServices={
    loginUser
}