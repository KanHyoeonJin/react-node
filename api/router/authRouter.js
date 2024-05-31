import express from "express";
import { Login, Logout, register } from "../controller/authController.js";
const router=express.Router();

router.post("/register",register)
router.post("/login",Login)
router.post("/logout",Logout);

export default router;