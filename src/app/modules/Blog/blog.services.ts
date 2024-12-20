import { string } from "zod"
import { TBlog } from "./blog.Interface"
import { BlogModel } from "./blog.modes"

const createBlogIntoDB=async(blog:TBlog)=>{
  
    const result =await BlogModel.create(blog)
    return result
}
// get all blogs
const getAllBlogsFromDB=async()=>{
    const result=await BlogModel.find();
        return result
}
// get single blogs
const getSingleBlogFromDB= async(_id:string)=>{
    const result=await BlogModel.findOne({_id})
    return result
}
// delete one blogs
const deleteOneBlogsFromDB=async(_id:string)=>{
const result=await BlogModel.findOneAndDelete({_id})
    // const result=await BlogModel.findById({_id}).deleteOne({_id})
    return result
}
// update one blogs
const updateOneBlogFromDB=async(_id:string,payload: Partial<TBlog>)=>{
    const { title,content,...remainingBLOGData } = payload;
    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingBLOGData,
      };
      if (title) {
       
          modifiedUpdatedData[`title`] = title;
        }
      
      if (content ) {
       
          modifiedUpdatedData[`content`] = content;
        }
      
    
     
      const result = await BlogModel.findByIdAndUpdate(_id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
      });
    // const result=await BlogModel.findOneAndUpdate({_id})
    return result
}

export const BlogServices={
    createBlogIntoDB,getSingleBlogFromDB,getAllBlogsFromDB,deleteOneBlogsFromDB,updateOneBlogFromDB
}