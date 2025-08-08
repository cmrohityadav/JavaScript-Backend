const Joi=require('joi');

const validateRegistration=(data)=>{
    const schema=Joi.object({
        username:Joi.string().min(3).max(15).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).max(20).required(),
    });

    return schema.validate(data);
}


module.exports={validateRegistration}