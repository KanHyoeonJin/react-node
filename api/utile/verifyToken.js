import jwt from "jsonwebtoken";
import { createError } from "../utiles/error.js";


export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    console.log("Token:", token);
    if(!token){
        return next(createError(401, "you are not authenticated"));;

    }
    jwt.verify(token, process.env.JWT, (err,user)=>{
        if(err) return next(createError(403, "Token is not valid!"));
        req.user=user;
        console.log("유저확인: "+ user);
        next();
    })
};

export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,()=>{
        console.log("토큰유저정보:",req.user)
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }else{
            return next(createError(403,"you are not authorized!"));
        } 
    });
};
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if (req.user.isAdmin) {
            next();
          } else {
            return next(createError(403, "You are not authorized!"));
          }
    });
    
  
  }