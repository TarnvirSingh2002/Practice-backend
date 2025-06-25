import mongoose from'mongoose'
export const db=()=>{
    mongoose.connect("")
    .then("connected")
    .catch("not connected")
}