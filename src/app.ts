// const express = require('express')
import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import { BlogsRoutes } from './app/modules/Blog/blog.routes';
import { AuthRoutes } from './app/modules/Auth/auth.routes';
import { AdminRoutes } from './app/modules/Admin/admin.routes';


const app:Application = express()
// const port = 5000
// middleware
app.use(express.json());
app.use(cors());
// application routes
app.use('/api/auth',AuthRoutes)
app.use('/api/blogs',BlogsRoutes)
app.use('/api/admin',AdminRoutes)
app.get('/', (req:Request, res:Response) => {
  res.send('welcome to Blog publisher World!')
})

export default app;