
const { User } = require('../models/User');
const generateToken = require('../utils/generateToken');
const logger=require('../utils/logger');
const { validateRegistration, validateLogin } = require('../utils/validation');

// user registration
const registerUser=async(req,res)=>{
    logger.info('Registration endpoint hit...');

    try {
        // validating the request
        const {error}=validateRegistration(req.body);
        if(error){
            logger.warn('Validation error',error.details[0].message);
            return res.status(400).json({
                success:false,
                message:error.details[0].message
            });
        }

        const {email,password,username}=req.body;

        let user=await User.findOne({$or:[{email},{username}]});

        if(user){
            logger.warn('User already exists');
            return res.status(400).json({
                success:false,
                message:'User already exists'
            });

        }

        user=new User({username,email,password});
        await user.save();

        logger.info('User created and saved successfully',user._id);

        const {accessToken,refreshToken}=await generateToken(user);

        res.status(201).json({
            success:true,
            message:'User registered successfully',
            accessToken,
            refreshToken 
        })


    } catch (error) {
       logger.error('Registration error occured',error);
       res.status(500).json({
        success:false,
        message:'Internal Server error'
       })
    }
}




// user login

const loginUser=async(req,res)=>{
    logger.info('Login enpoint hit...');
    try {
        const {error}=validateLogin(req.body);
        if(error){
            logger.warn("Validation error",error.details[0].message);
            return res.status(400).json({
                success:false,
                message:error.details[0].message
            })
        }

        const {email,password}=req.body;
        const user=await  User.findOne({email});

        if(!user){
            logger.warn('Invalid user');
            return res.status(400).json({
               success:false,
               message:'Invalid credentials' 
            })
        }

        const isValidPassword= await user.comparePassword(password);
        
        if(!isValidPassword){
            logger.warn('Invalid Password');
            return res.status(400).json({
               success:false,
               message:'Invalid password' 
            });
        }

        const {accessToken,refreshToken}= await generateToken(user);
        res.json({
            accessToken,
            refreshToken,
            userId:user._id
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

// refresh token



// logout


module.exports={registerUser,loginUser}