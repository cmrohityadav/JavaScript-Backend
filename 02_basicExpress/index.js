import express from "express"

const app=express()

const port=3000


app.get("/",(req,res)=>{
    res.send("hellooo From Rohit")
})

app.get("/about",(req,res)=>{
    res.send("He is final year student from Atharva college of engineering")
})

app.get("/instagram",(req,res)=>{
    res.send("hello @cmrohityadav_")
})



app.listen(port,()=>{
    console.log(`server is running at port: ${port}...`)
})