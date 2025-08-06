
const Jwt=require('jsonwebtoken');
const crypto=require('crypto');
const RefreshToken = require('../models/refreshTokenSchema');
const generateToken = async(user)=>{

    const accessToken=Jwt.sign(
        {
            userId:user._id,
            username:user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'60m'
        }
    );

    const refreshToken=crypto.randomBytes(40).toString('hex');
    const expiresAt= new Date();
    expiresAt.setDate(expiresAt.getDate()+7);

    await RefreshToken.create({
        token:refreshToken,
        user:user._id,
        expiresAt
    });


    return {refreshToken,accessToken}


}

module.exports=generateToken;