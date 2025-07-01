export const asyncHandler=(fn)=>async(req,res,next)=>{
    try{
        await fn(req,res,next);
    }
    catch{
        res.status().send({message:message});
    }
}