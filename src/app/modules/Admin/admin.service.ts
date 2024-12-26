import { Request, Response } from "express";
import { Usermodel } from "../User/user.models";
import { TUser } from "../User/user.Interface";
import { BlogModel } from "../Blog/blog.modes";




// export const blockUser = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const { userId } = req.params;
  
//       // Find the user by ID
//       const user = await Usermodel.findById(userId);
//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: 'User not found',
//           statusCode: 404
//         });
//       }
  
//       // Check if the user is already blocked
//       if (user.isBlocked) {
//         return res.status(400).json({
//           success: false,
//           message: 'User is already blocked',
//           statusCode: 400
//         });
//       }
  
//       // Update the isBlocked property to true
//       user.isBlocked = true;
//       await user.save();
  
//       return res.status(200).json({
//         success: true,
//         message: 'User blocked successfully',
//         statusCode: 200
//       });
//     } catch (error) {
//       console.error('Error blocking user:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Internal server error',
//         statusCode: 500
//       });
//     }
//   };

  const updateUserStatausFromDB=async(_id:string,payload: Partial<TUser>)=>{
      const { name,email,password,isBlocked,...remainingUserData } = payload;
      const modifiedUpdatedData: Record<string, unknown> = {
          ...remainingUserData,
        };
        modifiedUpdatedData.isBlocked=true
           
        const result = await Usermodel.findByIdAndUpdate(_id, modifiedUpdatedData, {
          new: true,
          runValidators: true,
        });
      // const result=await BlogModel.findOneAndUpdate({_id})
      return result}
      const deleteOneBlogsFromDB=async(_id:string)=>{
      const result=await BlogModel.findOneAndDelete({_id})
          // const result=await BlogModel.findById({_id}).deleteOne({_id})
          return result
      }
export const AdminServices={
    updateUserStatausFromDB,deleteOneBlogsFromDB
}