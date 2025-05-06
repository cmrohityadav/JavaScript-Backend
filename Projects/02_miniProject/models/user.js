import mongoose, { Schema } from "mongoose";

mongoose.connect("mongodb://localhost:27017/miniblogdb")

const userSchema=Schema({
    username:String,
    name:String,
    age:Number,
    email:String,
    password:String ,
    post:[{
        type:Schema.Types.ObjectId,
        ref:'post'
    }]
});

const userTable=mongoose.model('user',userSchema);
//just for undertood its not table
export default userTable;