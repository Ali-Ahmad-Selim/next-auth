import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { type } from "os";

const UserModel=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"userName is required"],
        unique:[true,"userName is not valid"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email is not valid"]
    },
    password:{
        type:String,
        reuired:[true,"password is required"]
    },
    isVerfied:{
        type:Boolean,
        default:false
    }, 
    isAdmin:{
        type:Boolean,
        default:false
    }, 
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    VerifyToken:String,
    VerifyTokenExpiry:Date

})

const user= mongoose.models.Users || mongoose.model("Users",UserModel)

export default user