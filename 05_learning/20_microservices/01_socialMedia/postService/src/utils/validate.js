const Joi=require('joi');

const validateCreatePost=(objData)=>{
    const schema=Joi.object({
        content:Joi.string().min(3).max(5000).required(),
    });


    return schema.validate(objData);
}

module.exports={validateCreatePost};