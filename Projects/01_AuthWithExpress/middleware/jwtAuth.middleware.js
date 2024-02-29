import  Jwt  from "jsonwebtoken";


const jwtAuthMiddleware=(req,res,next)=>{
 const token=(req.cookies && req.cookies.token) || null

 if(!token) {
    return res.status(400).json({
        success:false,
        message:"Not Authorized"

    })
 }
try {
    const payload=Jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    req.user={id:payload.id,email:payload.email}
    
} catch (error) {
    return res.status(400).json({
        success:false,
        message:"Not Authorized"

    })
    
}


next();
}

export {jwtAuthMiddleware}