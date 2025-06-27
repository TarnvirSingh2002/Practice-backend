import { Message } from "../models/message.js";

export const addMesage= async(req,res)=>{
    try {
        const {message}=req.body;
        if(!message){
            res.send(400).json('message require');
        }
        const mes=new Message({
            user:req?.user,
            message
        });
        await mes.save();
        res.status(200).send("successfully added");
    } catch (error) {
        res.status(500).send("Internal Server error 2");      
    }
}



export const getallmesssages= async(req,res)=>{
    try {
        const messsagesall=await Message.aggregate([
            {
                $match: { user: req.user }
            },
            {
                $lookup:{
                    from:"Register",
                    localField:"user",
                    foreignField:"_id",
                    as:"allUser"
                }
            },
            { 
                $sort: { createdAt: -1 } 
            }
        ])
        res.status(200).send({messsagesall});
    } catch (error) {
        res.status(500).send("Internal Server error 2");      
    }
}
