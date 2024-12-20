
import express from 'express'
import { BlogController } from './blog.controller'
import auth from '../Auth/auth'
import { User_Role } from '../User/user.constants'

const router=express.Router()


router.post('/',BlogController.createNewBlog)
router.get('/',BlogController.getAllBlogs)
router.get('/:id',BlogController.getSingleBlog)
router.delete('/:id',auth(User_Role.user),BlogController.DeleteSingleBlog)
router.patch('/:id',auth(User_Role.user),BlogController.updateOneBlog)


export const BlogsRoutes=router