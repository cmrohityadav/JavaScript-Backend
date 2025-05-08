import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const app=express()

import userTable from "./models/user.js"

app.get("/",(req,res)=>{
    res.send("hii from server testing")
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

import cookieParser from "cookie-parser"

app.use(cookieParser());


app.post("/register",async(req,res)=>{
    const {username,name,age,email,password}=req.body
    let user=await userTable.findOne({email})
    
    if(user) return res.status(401).send("User already registered")
    
    bcrypt.genSalt(10,(error,salt)=>{
        bcrypt.hash(password,salt,async(error,hash)=>{
        let  user= await userTable.create({
                username,
                name,
                email,
                age,
                password:hash
            });
           let token= jwt.sign({email:email,userId:user._id},"secretkey")
           res.cookie("token",token);
           res.status(200).send("registered")
        })

    })

});


app.post("/login",async(req,res)=>{

    const {email,password}=req.body;
    try {
        
        let user=await userTable.findOne({email})
        if(!user) return res.status(400).send("Invalid Email Id")
        
        let isAuth=await bcrypt.compare(password,user.password);
        if(!isAuth) res.status(400).send("wrong password")
        let token= jwt.sign({email:email,userId:user._id},"secretkey")
        res.cookie("token",token);
        if(isAuth) res.status(200).send("login successful");

        




    } catch (error) {
        console.error(error)
    }
})

app.get("/logout",(req,res)=>{
    res.clearCookie("token")
    res.status(200).send("Logged out successfully");
})


// adding middleware =>> protected route
function isLoggedIn(req,res,next){
    if(req.cookies.token===""){
        return res.status(400).send("u must be looged in")

    }else{
        let jwtData=jwt.verify(req.cookies.token,"secretkey")
        req.userDefineData=jwtData;
        req.anyData="rohit bhai"

    }

    next()
}

app.get("/profile",isLoggedIn,(req,res)=>{
    console.log(req.userDefineData)
    res.status(200).send(req.anyData)
})
const PORT=3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});


