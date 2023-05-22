import jwt from "jsonwebtoken"
export const verifyToken = async(req,res,next)=>{
    try{
        let token=req.header("Authorization");
        if(!token){
            res.status(400).send({msg:"Access denied"});
        }
        if(token.startsWith("Bearer")){
            token=token.slice(7,token.length).trimLeft()
        }

        const verified=jwt.verify(token,process.env.JWT_SECRET)
        req.user=verified;
        next();


        // jwt.verify(token, accessTokenSecret, (err, user) => {
        //     if (err) {
        //         return res.sendStatus(403);
        //     }

        //     req.user = user;
        //     next();
        // });

    }

    catch(err){
        res.status(500).json({error:err.message});
    }
}