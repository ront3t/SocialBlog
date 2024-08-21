import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import bodyParser from "body-parser"
import dotenv from "dotenv"
import morgan from 'morgan'
import createHttpError, {isHttpError} from 'http-errors'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {v2 as cloudinary} from "cloudinary"

import AuthRoutes from "./routes/Auth"
import UserRoutes from "./routes/User"
import postsRoutes from "./routes/Posts"
import notificationRoutes from "./routes/Notification"

///configurations
const app = express()
app.use(express.json())

dotenv.config()

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(bodyParser.json({limit:"30mb"}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(morgan('dev'));
app.use(cors())

///Routes
app.use("/api/auth",AuthRoutes)
app.use("/api/user",UserRoutes)
app.use("/api/posts",postsRoutes)
app.use("/api/notifications",notificationRoutes)

app.use( (req, res, next) => {
    next(createHttpError(404, "Endpoint not found"))  
})

app.use((error:unknown,req:Request, res:Response, next:NextFunction) => {
  let errorMessage = "fuck my life";
  let statusCode = 500;
  if (isHttpError(error))
  {
    statusCode = error.status
    errorMessage = error.message
  }
  res.status(statusCode).json({ error:errorMessage})
})

export default app
