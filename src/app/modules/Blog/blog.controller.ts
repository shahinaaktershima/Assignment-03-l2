import { Request, Response } from "express";
import { BlogServices } from "./blog.services";

const createNewBlog=async(req:Request,res:Response)=>{
    try{
        const blog=req.body
        const result=await BlogServices.createBlogIntoDB(blog);
        res.status(200).json({
            success:true,
            message:'blog is created successfully',
            data:result
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:err
        })
    }
}
// get all blogs
const getAllBlogs=async(req:Request,res:Response)=>{
    
        try{
            
            const result=await BlogServices.getAllBlogsFromDB()
            // res.send(result)
            res.status(200).json({
                success:true,
                message:"Blogs fetched successfully",
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
// get single blog
const getSingleBlog=async (req:Request,res:Response)=>{
    try{
        const{id}=req.params
  
        
        const result=await BlogServices.getSingleBlogFromDB(id)
        res.status(200).json({
            success:true,
            message:"single blog find successfully",
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
// delete one blog
const DeleteSingleBlog=async (req:Request,res:Response)=>{
    try{
        
            const{id}=req.params
            
            
            
        const result=await BlogServices.deleteOneBlogsFromDB(id)
        res.status(200).json({
            success:true,
            message:"Blog deleted successfully",
            statusCode:200
        })
        
        
        }  catch(err){
            res.status(500).json({
                success:false,
                message:"Something went wrong",
                error:err
            })
        }
    
}
// update one blogs
const updateOneBlog=async(req:Request,res:Response)=>{
    const {id}=req.params
    const blog = req.body;
    const result = await BlogServices.updateOneBlogFromDB(id,blog);
    res.status(200).json({
        success:true,
        message:"Blog updated successfully",
        data:result
    })
    
}
export const BlogController={
    createNewBlog,getSingleBlog,getAllBlogs,DeleteSingleBlog,updateOneBlog
}