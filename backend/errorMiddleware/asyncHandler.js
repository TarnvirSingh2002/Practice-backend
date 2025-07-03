export const asyncHandler=(fn)=>async(err,req,res,next)=>{
    try{
        await fn(req,res,next);
    }
    catch{
        res.status(err.status)
        .send({
            success:false,
            message:err.message
        });
    }
}