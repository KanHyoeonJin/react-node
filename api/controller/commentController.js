
import Comment from "../model/Comment.js";
import Post from "../model/Post.js";
export const addComment=async (req,res,next)=>{
    try{
        const {content}=req.body;
        const user=req.user;
        const {postId}=req.params;
        
        const post=await Post.findById(postId);
        if(!post){
            return res.status(404).json({message:"포스트없음"});
        }
        const newComment=new Comment({
            content,
            postId:postId,
            userId:user.ID
        });
        const savedComment=await newComment.save();
        res.status(201).json(savedComment);
    }catch(e){
        next(e);
    }
};
export const getCommentsByPostId=async(req,res,next)=>{
    try{
        const{postId}=req.params;
        const comments=await Comment.find({postId:postId});
        res.status(200).json(comments);
    }catch (e){
        next(e)
    }
};
export const getCommentByUserId=async(req,res,next)=>{
    try{
        const comment=await Comment.find({ID:req.user.ID})
        res.status(200).json(comment);
    }catch(e){
        next(e)
    }
};
export const updateComment=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const {content}=req.body;
        const user=req.user;

        const comment=await Comment.findById(id);
        if(!comment){
            return res.status(404).json({message:"댓글 없음"});
        }
        if(comment.userId !== user.ID || !isAdmin){
            return res.status(404).json({message:"작성자가 아니거나 관리자가 아님"});
        }
        comment.content=content;
        const updateComment=await comment.save();
        res.status(200).json(updateComment)
    }catch(e){
        next(e);
    }
};
export const deleteComment=async(req,res,next)=>{
    try{
        const {id} = req.params;
        const user=req.user;
        const comment=await Comment.findById(id);

        if(!comment){
            return res.status(404).json({message:"댓글못찾음"});
        }
        if(comment.userId !== user.ID || !isAdmin){
            return res.status(403).json({message:"자격루없음"});
        }
        await comment.remove();
        res.status(200).json({message:"지대로지웠다잉"});
    }catch(e){
        next(e);
    }
};