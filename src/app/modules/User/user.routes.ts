import express from 'express'
import { UserController } from './user.controller'


const router=express.Router()

// router.post('/create-user',UserController.createUser)
// router.get('/',UserController.getAllUser)
// router.get('/:email',UserController.getSingleUser)

export const UserRoutes=router