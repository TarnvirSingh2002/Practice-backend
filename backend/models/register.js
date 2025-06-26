import mongoose from'mongoose';
import jwt from "jsonwebtoken";
const regist = new mongoose.Schema({
    name: String,
    email:String,
    password:String},{
    timestamps:true
});

// regist.methods.tokengenerator=()=>{// here in arrow functions it not contain its own this
//     return jwt.sign({id:this._id},"tarnvir",{expiresIn:'1h'});
// }

regist.methods.tokenGenereator=function(){
    return jwt.sign({id:this._id},"Trahudgeu",{expiresIn:'1h'});
}
export const register = mongoose.model('register',regist);
