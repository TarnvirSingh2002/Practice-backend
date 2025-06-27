import { Register } from "../models/register.js";
import bcrypt from 'bcrypt';
export const regist=async(req,res)=>{
    try{
        const {name, email, password} = req.body;
        if(!name||!email||!password){
            return res.status(400).send({message:"Enter your full details"});
        }
        const existingPerson=await Register.findOne({email});
        if(existingPerson){
            return res.status(400).send({message:"already existed person"});
        }
        const salt=await bcrypt.genSalt(6);
        const passkey=await bcrypt.hash(password,salt);
        const re=new Register({
            name,
            email,
            password:passkey
        });
        await re.save();
        res.status(201).send({ message: "User registered successfully" });
    }
    catch(err){
        res.status(500).send({message:"internal Server error"});
    }
}


export const login=async(req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email||!password){
            return res.status(400).send({message:"Enter your full details"});
        };
        const data=await Register.findOne({email});
        if(!data){
            return res.status(401).send({message:"Unauthorized person"});
        };
        
        const matched=await bcrypt.compare(password,data.password);
        if(!matched){
            return res.status(401).send({message:"password is incorrect"});
        }
        const tok=data.tokenGenereator();
        res.status(200).send({tok});
    }
    catch(err){
        res.status(500).send({message:"internal Server error"});
    }
}