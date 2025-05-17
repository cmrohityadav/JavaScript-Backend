const express=require('express')


const app=express()

app.post("/uploadHere",(req,res)=>{
    res.send("")
})

app.listen(3000,()=>{
    console.log("server is running")
})


