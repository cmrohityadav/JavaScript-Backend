import express from "express"
const app=express()

import userTable from "./models/user.js"

app.get("/",(req,res)=>{
    res.send("hii from server testing")
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

import cookieParser from "cookie-parser"

app.use(cookieParser());


app.post("/register",(req,res)=>{
    const {username,name,age,email,password}=req.body
    
})
const PORT=3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
