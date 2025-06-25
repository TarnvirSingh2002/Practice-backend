import { register } from "../models/register";

export const regist=async(req,res)=>{
    try{
        const {name, email, password} = req.body;
        if(!name||!email||!password){
            return res.status(400).send({message:"Enter your full details"});
        }
        await register.create({name,email,password});
        res.status(200).send({message:"Created"});
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
        const data=register.findOne({email});
        if(!data){
            return res.status(401).send({message:"Unauthorized person"});
        };
        if(data.password!=password){
            return res.status(401).send({message:"password is incorrect"});
        }
        res.status(200).send("loged in!");
    }
    catch(err){
        res.status(500).send({message:"internal Server error"});
    }
}