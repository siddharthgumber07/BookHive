import { User } from "../models/user.model.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.middleware.js";
import jwt, { decode } from 'jsonwebtoken'
export const isAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("User is not authenticated!",400));
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    console.log(decoded);
    req.user=await User.findById(decoded.id);
    next()
    
})


export const isAuthorized=(roles)=>{
    return(req,res,next)=>{
        
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler("Only admin is authorized to perform this action.",400));
        }
        next();
    }
}