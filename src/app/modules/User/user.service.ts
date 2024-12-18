import { TUser } from "./user.Interface";
import { Usermodel } from "./user.models";

const createUserIntoDB=async(user:TUser)=>{
    const result =await Usermodel.create(user)
    return result
}

export const UserServices={
    createUserIntoDB
}