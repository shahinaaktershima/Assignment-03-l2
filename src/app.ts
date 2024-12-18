// const express = require('express')
import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import { UserRoutes } from './app/modules/User/user.routes';


const app:Application = express()
// const port = 5000
// middleware
app.use(express.json());
app.use(cors());
// application routes
app.use('/api/auth',UserRoutes)
app.get('/', (req:Request, res:Response) => {
    var a =10;
  res.send('Hello World!')
})

export default app;