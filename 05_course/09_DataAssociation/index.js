const express=require('express')


const app=express()

const userModel=require("./modal/user");
const postModel=require("./modal/posts");

app.get("/",(req,res)=>{
    res.send("hello from server 1")
})

app.get("/createUser",async(req,res)=>{
    let user= await userModel.create({
        userName:"user1",
        age:1,
        email:'user1@email.com'
    })

    res.send(user)
})

app.listen(3000,(error)=>{
    try {
        console.log(`server is running`)
    } catch (error) {
        console.error("error while starting server",error)
    }
})



