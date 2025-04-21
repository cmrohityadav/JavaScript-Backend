const express=require("express")
const app=express()
const cookieParser=require("cookie-parser")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.get("/",(req,res)=>{

        res.send("Hello from server")
})


const port=3000
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})