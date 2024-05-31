import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import bcrypt from "bcryptjs"
import { verifyUser,verifyToken } from '../utile/verifyToken';
import Post from '../model/Post';

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
        const post=await Post.findById();
    }catch(e){
        next(e)
    }
};