import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import bodyParser from "body-parser"
import dotenv from "dotenv"
import morgan from 'morgan'
import createHttpError, {isHttpError} from 'http-errors'
import cors from 'cors'

import userRoutes from "./routes/User"
import postsRoutes from "./routes/Posts"

///configurations
const app = express()
app.use(express.json())
dotenv.config()
app.use(bodyParser.json({limit:"30mb"}))
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
app.use(morgan('dev'));
app.use(cors())

///Routes
app.use("/api/user",userRoutes)
app.use("/api/posts",postsRoutes)

app.use( (req, res, next) => {
    next(createHttpError(404, "Endpoint not found"))  
})

app.use((error:unknown,req:Request, res:Response,next:NextFunction) => {
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
