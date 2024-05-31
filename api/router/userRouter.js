import express from "express";
import { getUserProfile, updateProfileImage, updateUserProfile } from "../controller/userController.js";
import { verifyToken, verifyUser } from '../utile/verifyToken.js';
import upload from "../utile/upload.js";

const router = express.Router();

router.get('/getprofile', verifyToken, getUserProfile);
router.put('/:id', verifyUser, updateUserProfile);
router.put('/:id/profileImage', verifyUser, upload.single('file'), updateProfileImage);

export default router; 