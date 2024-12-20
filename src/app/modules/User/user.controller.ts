import { Request, Response } from "express";
import { UserServices } from "./user.service"

const createUser=async(req:Request,res:Response)=>{
    try{
        const user=req.body
        const result=await UserServices.createUserIntoDB(user);
        res.status(200).json({
            success:true,
            message: "User registered successfully",
            statusCode: 201,
            data: {
              _id: result._id,
              name: user?.name,
              email: user?.email
            }
        })
    }catch(err){
        res.status(400).json({
            success:false,
            message:"Validation erroR",
            statusCode:400,
            error:err,
            stack:"error-stack"
    })
}}
// get all user
const getAllUser=async(req:Request,res:Response)=>{
    
        try{
            console.log(req.user);
            
            const result=await UserServices.getAllUsersFromDB()
            // res.send(result)
            res.status(200).json({
                success:true,
                message:"users retrieved successfully",
                data:result
            })
        }
        catch(err){
            res.status(500).json({
                success:false,
                message:"Something went wrong",
                error:err
            })
        }
    }
// get single user
const getSingleUser=async (req:Request,res:Response)=>{
    try{
        const{id}=req.params
        const result=await UserServices.getSingleUserFromDB(id)
        res.status(200).json({
            success:true,
            message:"single user find successfully",
            data:result
        })
        }  catch(err){
            res.status(500).json({
                success:false,
                message:"Something went wrong",
                error:err
            })
        }
    
}
export const UserController={
    createUser,getAllUser,getSingleUser
}