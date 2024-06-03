import express from "express";
import { Login, Logout, register } from "../controller/authController.js";
const router=express.Router();

router.post("/register",register)
router.post("/loginman",(req,res,next)=>{
    console.log("로그인 요청 도착");
    next();
},Login)
router.post("/logout",Logout);

export default router;