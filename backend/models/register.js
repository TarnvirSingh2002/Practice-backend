import mongoose from'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const regist = new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    refreshToken:String},{
    timestamps:true
});


regist.pre('save',async function(next){// before getting save() into the db

    if(!this.isModified('password')){
        return next();//return and go outside when password is not modified
    }
        const salt=await bcrypt.genSalt(6);
        this.password=await bcrypt.hash(this.password,salt);
        next();
});

regist.methods.varifyPassword=async function(password){//used to compare the password
    return await bcrypt.compare(password, this.password);
};


// regist.methods.tokengenerator=()=>{// here in arrow functions it not contain its own this
//     return jwt.sign({id:this._id},"tarnvir",{expiresIn:'1h'});
// }

regist.methods.tokenAccessGenereator=function(){
    return jwt.sign({id:this._id},"Trahudgeu",{expiresIn:'1h'});
}//as we provide (id) variable to store id so we will only get from here

regist.methods.tokenRefreshGenereator=function(){
    return jwt.sign({id:this._id},"ikjhgb",{expiresIn:'7d'});
}

export const Register = mongoose.model('Register',regist); //give the capital name 
// to differentiate between the local variable and schema model