import mongoose from "mongoose";
const User=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    ID:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    img:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});
export default mongoose.model("User2",User,"user2");