import { verifyToken,verifyUser,verifyAdmin } from "../utile/verifyToken.js";
import express from "express";
import { createPost,deletePost,getPost,getPostByUserId,getPosts,updatePost } from "../controller/postController.js";

const router=express.Router();

router.post('/',verifyUser,createPost);
router.get('/', getPosts);
router.get('/user',verifyUser,getPostByUserId);
router.get('/:id',getPost);
router.put('/:id',verifyUser,verifyAdmin,updatePost);
router.delete('/:id',verifyUser,verifyAdmin,deletePost);

export default router;