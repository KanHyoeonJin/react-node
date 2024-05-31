import Comment from "../model/Comment";
import Post from "../model/Post";
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