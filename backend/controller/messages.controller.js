import mongoose from "mongoose";
import { Message } from "../models/message.js";
import { ApiError } from "../errorMiddleware/ApiError.js";
import { asyncHandler } from "../errorMiddleware/asyncHandler.js";

export const addMesage = asyncHandler(async (req, res, next) => {
        const { message } = req.body;
        if (!message) {
            throw new ApiError("enter something", 400);
        }
        const mes = new Message({
            user: req?.user,
            message
        });
        await mes.save();
        res.status(200).send("successfully added");
});


export const getallmesssages = async (req, res, next) => {
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
                    as: "allUser",
                    pipeline: [
                        {
                            $project: {//it return all the data from the parent and given fields from the lookup 
                                name: 1,
                                email: 1
                            }
                        }
                    ]
                }
            },
            {
                $sort: { createdAt: -1 }// 
                // 1 for ascending, -1 for descending
            },
            {
                $skip: 1 // how many we have to skip
            },
            {
                $limit: 1 // set the limit how many we want to access
            },
            // {
            //     $unwind: "$allUser"  // Flattens the allUser array
            // },
            // {
            //     $project:{
            //         "allUser.name": 1,//we have to used this to filter the data from the lookup field
            //         "allUser.email": 1,
            //     }
            // }

        ]);

        res.status(200).send({ messsagesall });
    } catch (error) {
        next(error);
    }
};

// export const getallmesssages = async (req, res) => {
//     const all= await Message.find({
//         user:req?.user//it automatically convert string into the object
//     }).populate({
//         path:'user', // this define the localField
//         select:'name email'}) //(optional)what we have to select & there must be space between them
//     .sort({ createdAt: -1 });  
//     res.send({all});
// }

export const updateMessage = asyncHandler(async (req, res, next) => {
    const { id, message } = req.body;
    // try {
        const person = await Message.findByIdAndUpdate(id,//we get id
            { $set: { message } },//here what we want to set or change
            //{$unset:{password:""}} //we can upadte the document by removing the data from a field
            { new: true })//this is used so that we will get new updated data in our const variable
            .select('-user');
        res.status(200).json({ person });
    // }
    // catch (err) {
    //     next(err);
    // }
});