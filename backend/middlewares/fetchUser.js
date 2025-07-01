import jwt from 'jsonwebtoken';
export const fetchUser=(req,res,next)=>{ 
    const token=req.cookies?.accessToken;
    console.log(token);
    if(!token){
        return res.status(401).send({error:"Please authenticate using a valid token"});
    }
    try {
        const data= jwt.verify(token,'Trahudgeu');
        console.log(data);
        req.user=data.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({error:"Please authenticate using a valid token"});
    }

}