import mongoose from "mongoose";

import { Schema } from "mongoose";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"
import crypto from "crypto"
const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"user name is Required"],
        minLength:[3,"name must be at least 3 Char"],
        maxLength:[50,"Name must be less than 50 char"],
        trim:true

    },
    email:{
        type:String,
        required:[true,"email is Required"],
        unique:true,
        lowercase:true,
       
    },
    password:{
        type:String,
        select:false
    },
    forgotPasswordToken:{
        type:String
    },
    forPasswordExpiryDate:{
        type:Date
    }
},{timestamps:true});
userSchema.methods={
    jwtToken(){
        return Jwt.sign(
            {
                id:this._id,
                email:this.email
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            }





        )
    },
    getForgotPasswordToken() {
        const forgotToken = crypto.randomBytes(20).toString('hex');
        //step 1 - save to DB
        this.forgotPasswordToken = crypto
          .createHash('sha256')
          .update(forgotToken)
          .digest('hex');
    
        /// forgot password expiry date
        this.forgotPasswordExpiryDate = Date.now() + 20 * 60 * 1000; // 20min
    
        //step 2 - return values to user
        return forgotToken;
      },


}



userSchema.pre("save", async function(next){
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
}
)
 export const userModel=mongoose.model("User",userSchema)