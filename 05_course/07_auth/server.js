const express=require('express')
const app=express()

app.get("/",(req,res)=>{
//set cookie 
res.cookie("name","rohitcookie")
res.send("Hello Rohit its from server setting cookie")

});


// for reading cookie
const cookieParser=require('cookie-parser')
app.use(cookieParser())

app.get("/read",(req,res)=>{
    console.log("Cookie: ",req.cookies)
})


// using bcrypt encrypt
const bcrypt = require('bcrypt');
app.get("/genhash",(req,res)=>{
    const saltRounds = 10;
    const myPlaintextPassword = 'rohit123';
    
    bcrypt.genSalt(saltRounds, function(err, salt) {
        console.log("salt: ",salt)
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            // Store hash in your password DB.
            console.log("hash: ",hash)
            res.send(`hash: ${hash}`)
        });
    });
})

// decrypt using bcrypt
app.get("/decrypt",(req,res)=>{
    let encrpyedPassword="$2b$10$KSH5bI2uls6wjHbNW0lZtOhKahNNhfTR1NJcQ2qtTlcj6JVtu6o8."
    bcrypt.compare("rohit123",encrpyedPassword,(err,result)=>{
        console.log(result)
    })

    res.send("decryption")

})

// jsonwebtoken
const jwt=require("jsonwebtoken")

app.get("/jwtsign",(req,res)=>{
    let token=jwt.sign({email:"r@dev.com"},"rohitsecret")
    console.log(token)
    res.cookie("token",token)
    res.send(token)
})


app.get("/jwtverify",(req,res)=>{
   let tokenData= jwt.verify(req.cookies.token,"rohitsecret")
   console.log("Token Data: ",tokenData)
   res.send("token data: ",tokenData.email)
})
app.listen(3000);