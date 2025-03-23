
const express=require("express")
const path=require("path")
const fs=require('fs')


const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')




app.get("/profile/rohit",(req,res)=>{
    res.send("now u at profle/rohit")
})

//dynamic routing || params
app.get("/profile/:kuchBhi",(req,res)=>{
    const {kuchBhi}=req.params
    res.send(`dynamic routing ${kuchBhi}`)
})

app.get("/profile/:username/:age",(req,res)=>{
    const {username,age}=req.params
    res.send(`route ${username}/${age}`)
})

app.get("/", (req, res) => {
    fs.readdir("./files", (err, files) => {
        if (err) {
            console.error("Error reading files directory:", err);
            return res.sendStatus(500);
        }
        res.render("index", { files: files });
    });
});

app.post("/create",(req,res)=>{
  const  fileName=req.body.title.split(" ").join("") 
  
    fs.writeFile(`./files/${fileName}.txt`,req.body.details,(err)=>{
res.redirect("/")
    })
})

app.listen(3000,()=>{
    console.log("server is running  ")
})