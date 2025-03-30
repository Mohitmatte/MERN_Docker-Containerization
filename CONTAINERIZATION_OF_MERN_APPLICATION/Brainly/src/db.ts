import mongoose, {model,Schema}  from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL!);

const UserSchema=new Schema({
    username: {type:String,unique:true},
    password:String,
})

export const userModel=model("User",UserSchema);

const ContentSchema=new Schema({
    link:String,
    type:String,
    title:String,
    tags:[{type:mongoose.Types.ObjectId , ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId , ref:'User' , required:true}
})

export const ContentModel=model("Content",ContentSchema);

const LinkSchema=new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId , ref:'User' , required:true,unique:true}
})

export const LinkModel=model("Link",LinkSchema);