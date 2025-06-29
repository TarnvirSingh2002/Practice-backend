import mongoose from "mongoose";
import { Message } from "../models/message.js";

export const addMesage= async(req,res)=>{
    try {
        const {message}=req.body;
        if(!message){
            res.send(400).json('message require');
        }
        const mes = new Message({
            user:req?.user,
            message
        });
        await mes.save();
        res.status(200).send("successfully added");
    } catch (error) {
        res.status(500).send("Internal Server error 2");      
    }
}


export const getallmesssages = async (req, res) => {
    try {
        const messsagesall = await Message.aggregate([
            {
                $match: { //it is used as a (where) clouse
                    user: new mongoose.Types.ObjectId(req.user) 
// it does not automatically convert string into the objectId so we have to convert it
                }
            },
            {
                $lookup: { //lookup is just to connect two documents
                    from: "registers", 
                    localField: "user",
                    foreignField: "_id",
                    as: "allUser"
                }
            },
            {
                $sort: { createdAt: -1 }// 
                // 1 for ascending, -1 for descending
            },
            {
                $skip:1 // how many we have to skip
            },
            { 
                $limit: 1 // set the limit how many we want to access
            }
        ]);

        res.status(200).send({ messsagesall });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error 2");
    }
}

// export const getallmesssages = async (req, res) => {
//     const all= await Message.find({
//         user:req?.user//it automatically convert string into the object
//     }).populate({
//         path:'user', // this define the localField
//         select:'name email'}) //(optional)what we have to select & there must be space between them
//     .sort({ createdAt: -1 });  
//     res.send({all});
// }