import { Model } from "mongoose";
import { User_Role } from "./user.constants";

export interface TUser  {
    name: string; // Full name of the user
    email: string; // Email address for authentication and communication
    password: string; // Securely stored password
    role: "admin" | "user"; // Access level, defaults to "user"
    isBlocked: boolean; // Flag to indicate if the user is blocked, defaults to false
    createdAt: Date; // Timestamp of user creation
    updatedAt: Date; // Timestamp of the last update
  }
export interface Usermodels extends Model<TUser>{
  // mystaticMethod():number
  isUserExistByCustomId(id:string):Promise<TUser>
  isPasswordMatched( plainTextPassword:string,
    hashedPassword:string):Promise<boolean>
}
export type TuserRole=keyof typeof User_Role