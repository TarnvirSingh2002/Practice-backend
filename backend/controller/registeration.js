import jwt from "jsonwebtoken";
import { Register } from "../models/register.js";
export const regist=async(req,res)=>{
    try{
        const {name, email, password} = req.body;
        if(!name||!email||!password){
            return res.status(400).send({message:"Enter your full details"});
        }

        const existingPerson=await Register.findOne({$or:[{name},{email}]});
        //it checks both name or email
        // findOne({name,email}) behaves like an AND condition 

        if(existingPerson){
            return res.status(400).send({message:"already existed person"});
        }
        const re=new Register({
            name,
            email,
            password //it automatically gets update before saving
        });

        await re.save();
        res.status(201).send({ message: "User registered successfully" });
    }
    catch(err){
        res.status(500).send({message:"internal Server error"});
    }
}



const generateRefreshToken=async(userId)=>{

    const user = await Register.findById(userId).select('-password');
    
    const accessToken=user.tokenAccessGenereator();//it is for short time

    const refreshToken=user.tokenRefreshGenereator();

//it is for the long time(optional) so that user do not have to login again to get the access-token(when it is expire) 
    user.refreshToken=refreshToken;

    user.save();
    return{
        accessToken,
        refreshToken
    }
}

//working on error middleware
export const login= async(req,res)=>{
    try{
        const {email, password} = req.body;

        if(![email, password].every(ele => typeof ele === 'string' && ele.trim() !== "")){
            // return res.status(400).send({message:"Enter your full details"});
            throw new Error(400,"enter all details");
        };

        const data=await Register.findOne({email});
        if(!data){
            return res.status(401).send({message:"Unauthorized person"});
        };

        const matched = await data.varifyPassword(password);
        if(!matched){
            return res.status(401).send({message:"password is incorrect"});
        }

        const {accessToken, refreshToken}=await generateRefreshToken(data._id);
        res.cookie('accessToken', accessToken,{ httpOnly: true})
        .cookie('refreshToken',refreshToken,{httpOnly:true}); //
        //[httpOnly : true] cannot be accessed via JavaScript on the browser(document.cookie)
        //[secure : true] Only be sent over HTTPS connections (not be sent over plain HTTP)
        res.status(200).send({refreshToken, message:"login successfully"});
    }
    catch(err){
        res.status(500).send({message:"internal Server error"});
    }
};


export const refreshTokenUpdate=async(req,res)=>{
    try{
        const refToken = req.cookies?.refreshToken;

        if(!refToken){
                return res.status(401).send({error:"Please authenticate using a valid token"});
            }
                
        const data= jwt.verify(refToken,'ikjhgb');    
         
        const person=await Register.findById(data.id);

        if(!person){
            return res.status(401).send({error:"user not found"});
        }

        if(person.refreshToken!==refToken){
            return res.status(401).send({error:"refresh token is expired"});
        }

        console.log(person._id);
        const { accessToken, refreshToken }=await generateRefreshToken(person._id);
        res.cookie('accessToken', accessToken,{ httpOnly: true})
        .cookie('refreshToken',refreshToken,{httpOnly:true});

        res.status(200).send({message:"update successfully"});
    }
    catch(error){
        res.status(500).send({message:error?.message});
    }
}