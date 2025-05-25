import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { connectDB } from './db/db.js';
import authRouter from './routes/auth.route.js'
import { errorMiddleware } from './middlewares/error.middleware.js';
import bookRouter from './routes/book.route.js'
import borrowRouter from './routes/borrow.route.js'
import {v2 as cloudinary} from 'cloudinary'
import expressFileUpload from 'express-fileupload'
import userRouter from './routes/user.route.js';
import { notifyUsers } from './services/notifyUsers.js';
import { removeUnverifiedAccounts } from './services/removeUnverifiedAccounts.js';
const app=express();
dotenv.config({path:"./config/.env"})
const PORT=process.env.PORT||3000;

app.use(cors({
    origin:"https://bookhive07.netlify.app",
    methods:["GET", "POST","PUT","DELETE"],
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(expressFileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))
app.use(cookieParser())
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/book",bookRouter)
app.use("/api/v1/borrow",borrowRouter);
app.use("/api/v1/user",userRouter);

notifyUsers();
removeUnverifiedAccounts()
connectDB()


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET,
    
})

app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);
})

app.use(errorMiddleware)