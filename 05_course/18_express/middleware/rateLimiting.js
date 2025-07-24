const rateLimit=require('express-rate-limit');

const createBasicRateLimit=(maxRequest,timeMS)=>{
    return rateLimit({
        max:maxRequest,
        windowMs:timeMS,
        message:'Too many request, please try again later',
        standardHeaders:true,
        legacyHeaders:false,
    })
}

module.exports={createBasicRateLimit};