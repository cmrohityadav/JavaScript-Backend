const Joi=require('joi');

const validateRegistration=(data)=>{
    const schema=Joi.object({
        username:Joi.string().min(3).max(15).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).max(20).required(),
    });

    return schema.validate(data);
}

const validateLogin=(data)=>{
    const checkParams=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(6).max(20).required(),
    })

    return checkParams.validate(data);
}


module.exports={validateRegistration,validateLogin}