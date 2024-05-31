import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import bcrypt from "bcryptjs"

import Post from '../model/Post.js';

export const createPost=async(req,res,next)=>{
    try{
    const {title, content}=req.body;
    const user=req.user;
    const newPost=new Post({
        title,
        content,
        ID:user.ID 
    });
    const savedPost=await newPost.save();
    res.status(201).json(savedPost);
    }catch(e){
       next(e)
    }
};
export const getPosts=async(req,res,next)=>{
    try{
        const posts=await Post.find();
        res.json(posts);
    }catch  (e){
        next(e)
    }
};
export const getPostByUserId=async(req,res,next)=>{
    try{
        const posts=await Post.find({ ID:req.user.ID})
        res.status(200).json(posts);
    }catch(e){
        next(e)
    }
};
export const getPost=async(req,res,next)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"포스트엇ㅂ음"});
        }
    }catch(e){
        next(e)
    }
};
export const updatePost=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const {title,content}=req.body;
        const user=req.user;

        const post=await Post.findById(id);
        if(!post){
            return res.status(404).json({message:"편집할포스트없음"});
        }
        if(post.ID !== user.ID || !isAdmin){
            return res.status(403).json({message:"자격없음"});
        }
        post.title=title;
        post.content=content;
        const updatedPost=await post.save();
        res.status(200).json(updatedPost);

    }catch(err){
        next(err);
    }
};

export const deletePost=async(req,res,next)=>{
    try{
        const {id} = req.params;
        const user=req.user;

        const post=await Post.findById(id);
        if(!post){
            return res.status(403).json({message:"이미삭제할거없음"});
        }
        if(post.ID !== user.ID || !isAdmin){
            return res.status(403).json({message:"자격없음"});
        }
        await post.remove();
        res.status(200).json({message:"포스트지워짐"});
    }catch(e){
        next (e)
    }
};