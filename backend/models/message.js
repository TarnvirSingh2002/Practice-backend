import mongoose from "mongoose";
const mess=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
        ref:"Register"// Must match the model name exactly, case-sensitive
    },
    message:String,},{
    timestamps:true
});
export const Message = mongoose.model("Message",mess);