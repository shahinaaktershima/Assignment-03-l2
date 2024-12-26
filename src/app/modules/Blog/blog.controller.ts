import { Request, Response } from "express";
import { BlogServices } from "./blog.services";
import { Usermodel } from "../User/user.models";

const createNewBlog=async(req:Request,res:Response)=>{
    try{
        const blog=req.body
        const user=req.user
        
        console.log(user);
        
        const result=await BlogServices.createBlogIntoDB(blog);
        
        res.status(200).json({
            success:true,
            message:'blog is created successfully',
            statusCode: 201,
            data:[{
                _id:result._id,
                title: result.title,
                content: result.content,
                author: user.id
              }]
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
            const { search, sortBy = 'createdAt', sortOrder = 'desc', filter } = req.query;

    // Base query object
    const query: any = {};

    // Apply search filter (title or content)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } }, // Case-insensitive search in title
        { content: { $regex: search, $options: 'i' } }, // Case-insensitive search in content
      ];
    }

    // Apply author filter
    if (filter) {
      query.author = filter;
    }

    // Define sort object
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1; // 1 for ascending, -1 for descending

    // Fetch blogs from the database
   
            const result=await BlogServices.getAllBlogsFromDB(query,sort)
            // res.send(result)
            res.status(200).json({
                success:true,
                message:"Blogs fetched successfully",
                statusCode: 200,
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
        statusCode: 200,
        data:result
    })
   
}
export const BlogController={
    createNewBlog,getSingleBlog,getAllBlogs,DeleteSingleBlog,updateOneBlog
}