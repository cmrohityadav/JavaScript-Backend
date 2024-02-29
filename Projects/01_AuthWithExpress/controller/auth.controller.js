import { userModel } from "../model/user.model.js";
import emailValidator from "email-validator"
import bcrypt from "bcrypt"
const signup= async(req,res,next)=>{

    const {name,email,password,confirmPassword}=req.body
    console.log(name,email,password,confirmPassword);
    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Every field is required",

        })
    }

    const validEmail=emailValidator.validate(email);
    // console.log(validEmail)
    if(!validEmail){
        return res.status(400).json({
            success:false,
            message:"Please Provide Valid email ",

        })
    }

    if(password!==confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Please Provide password and confirmPassword same",

        })
    }
   try {
       // const userInfo=userModel({
    //     name:name,
    //     email:email,
    //     password:password,
    // })
     const userInfo=userModel(req.body);
     const result =await userInfo.save();

        // other method
    // const result= await userModel.create(req.body)
     
     res.status(200).json(
        {
         success:true,
         data:result
        }
 
     )
   } catch (error) {
    if(error.code==11000){
        return  res.status(400).json({
            success:false,
            message:"account already exists with provided email id"
        })
    }

    return  res.status(400).json({
        success:false,
        message:error.message
    })
     
   }
}
const signin=async(req,res)=>{
    const {email, password}=req.body
    if(!password || !email){
        return res.status(400).json({
            success:false,
            message:"Every field is mandatory",

        })
    }
    
    try {
        const user=await userModel.findOne({
            email
        }).select('+password')
    
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({
                success:false,
                message:"invalid credentials",
    
            })
    
        }
    
        const token=user.jwtToken();
         user.password=undefined;
    
    
         const cookieOption={
            maxAge:24*60*60*1000,
            httpOnly:true,
            secure:true,
         }
    
         return res.status(200).cookie("token",token,cookieOption).json({
            success:true,
            data:user,
            message:"login successfully",
    
         })
    } catch (error) {
        
        return res.status(400).json({
            success:false,
            message:error.message
            
        })
    }
     
}

const getUser=async(req,res,next)=>{
  
 const userId=req.user.id;

 try {
     const user=await userModel.findById(userId)

     return res.status(200).json({
        success:true,
        data:user,
        message:"user info",



     })
 } catch (error) {
    return res.status(400).json({
        success:false,
        message:error.message

    })
 }




}

const logout=(req,res)=>{
    try {
        const cookieOption={
            expires:new Date(),
            httpOnly:true,
        }

        res.cookie("token",null,cookieOption)
        .status(400).json({
            success:true,
            message:"Logged out"

        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message

        })
        
    }


}

const forgotPassword = async (req, res, next) => {
    const email = req.body.email;
  
    // return response with error message If email is undefined
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }
  
    try {
      // retrieve user using given email.
      const user = await userModel.findOne({
        email
      });
  
      // return response with error message user not found
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "user not found 🙅"
        });
      }
  
      // Generate the token with userSchema method getForgotPasswordToken().
      const forgotPasswordToken = user.getForgotPasswordToken();
  
      await user.save();
  
      return res.status(200).json({
        success: true,
        token: forgotPasswordToken
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  
  const resetPassword = async (req, res, next) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
  
    // return error message if password or confirmPassword is missing
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirmPassword is required"
      });
    }
  
    // return error message if password and confirmPassword  are not same
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirm Password does not match ❌"
      });
    }
  
    const hashToken = crypto.createHash("sha256").update(token).digest("hex");
  
    try {
      const user = await userModel.findOne({
        forgotPasswordToken: hashToken,
        forgotPasswordExpiryDate: {
          $gt: new Date() // forgotPasswordExpiryDate() less the current date
        }
      });
  
      // return the message if user not found
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid Token or token is expired"
        });
      }
  
      user.password = password;
      await user.save();
  
      return res.status(200).json({
        success: true,
        message: "successfully reset the password"
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };



export {signup,signin,getUser,logout,forgotPassword,resetPassword}