import { ObjectId } from "mongoose";

export type TBlog ={
    title: string; // Title of the blog post
    content: string; // Main content of the blog post
    author: ObjectId; // Reference to the User model
    isPublished: boolean; // Publication status, defaults to true
    createdAt: Date; // Timestamp of when the blog was created
    updatedAt: Date; // Timestamp of the last update
  }