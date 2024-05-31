import express from "express";
import { getUser,deleteUser,getUsers,updateProfileImage,updateUser } from "../controller/userController.js";
import { verifyUser } from "../utile/verifyToken.js";
import upload from "../utile/upload.js";

const router = express.Router();

router.get('/getprofile', verifyUser, getUser);
router.put('/:id', verifyUser, updateUser);
router.put('/:id/profileImage', verifyUser, upload.single('file'), updateProfileImage);

export default router; 