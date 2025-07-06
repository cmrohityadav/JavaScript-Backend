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

app.get("/post/create",async(req,res)=>{

    let post=await postModel.create({
        postData:"this is data for post",
        user:"6817c1a0d820273746b56740",

    })

    let user= await userModel.findOne({_id:"6817c1a0d820273746b56740"})
    user.post.push(post._id)

   await  user.save()
    res.send({post,user})
})

app.listen(3000,(error)=>{
    try {
        console.log(`server is running`)
    } catch (error) {
        console.error("error while starting server",error)
    }
})



