import mongoose from "mongoose";
const mess=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
        ref:"register"
    },
    message:String,},{
    timestamps:true
});
export const message = mongoose.model("message",mess);