import mongoose from "mongoose";
const Comment=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});
export default mongoose.model("Comment",Comment);