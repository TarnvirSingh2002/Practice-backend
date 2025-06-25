import mongoose from'mongoose';

const regist = new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    timestamps:true
});

export const register = mongoose.model('register',regist);
