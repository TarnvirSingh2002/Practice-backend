import mongoose from'mongoose'
export const db=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/backendPractice")
    .then("connected")
    .catch("not connected")
}