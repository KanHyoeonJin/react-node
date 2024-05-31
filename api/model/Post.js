import mongoose from "mongoose";
const PostSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    ID:{
        type:String,
        required:true
    }
});
export default mongoose.model('Post',PostSchema);
