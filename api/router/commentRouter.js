import express from "express";
import { addComment, getCommentByUserId, getCommentsByPostId,updateComment,deleteComment } from "../controller/commentController.js";
import { verifyUser,verifyAdmin } from "../utile/verifyToken.js";

const router=express.Router();

router.post('/:postId/comments',verifyUser,addComment);
router.get('/:postId/comments',getCommentsByPostId);
router.put('/comments/:id',verifyUser,verifyAdmin,updateComment);
router.delete('/comments/:id',verifyUser,verifyAdmin,deleteComment);

export default router;