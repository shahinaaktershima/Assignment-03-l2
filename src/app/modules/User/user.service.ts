import { TUser } from "./user.Interface";
import { Usermodel } from "./user.models";

const createUserIntoDB=async(user:TUser)=>{
    const result =await Usermodel.create(user)
    return result
}
const getAllUsersFromDB=async()=>{
    const result=await Usermodel.find();
    return result
}
// getsingleuser
const getSingleUserFromDB= async(_id:string)=>{
    const result=await Usermodel.findOne({_id})
    return result
}
export const UserServices={
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB
}