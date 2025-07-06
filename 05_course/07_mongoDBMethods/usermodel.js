const mongoose=require("mongoose")

//creating DB
mongoose.connect("mongodb://localhost:27017/koibhidb")

//Structure of Schema
/** schema serves as a blueprint for documents(~row) within a MongoDB collection(~table)*/ 
const userSchema=mongoose.Schema({
    name:String,
    username:String,
    email:String
})

//creating collection  ~Table
module.exports=mongoose.model("user",userSchema)
/**exporting bcz we will use this collection(~table) in many routes */
