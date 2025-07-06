import express from "express";

const app = express();

//Middlewares 1 way
app.use(function(req,res,next){
    console.log("Middleware doing critical operations")
    
    /**
     * if we dont use next then It will stuck 
     * reloads continueosly
     * 
     * next():: iske wajah se request aage jayegi
     */
    next()
})


app.use(function(req,res,next){
    console.log("middleware 2 working ek baar auur")
    next()
})


//Middlewares 2 way
function middlewareCheckAdmin(req,res,next){
    console.log("Admin varifying using db call...")
    next()
}
app.get("/admin",middlewareCheckAdmin,(req,res)=>{
    res.send("U are  verified ADMIN")
})




//routes apiendpoint all are same just change the function type
//works same
app.get("/", (req, res) => {
    res.send("home page")
})

app.get("/about",function(req,res){
    res.send("ABOUT:: Rohit")
})


function requestHandler(req, res) {
    res.send("welcome to profile");
}

app.get("/profile", requestHandler);


//dynamic routing || params
app.get("/profile/:kuchBhi",(req,res)=>{
    const {kuchBhi}=req.params
    res.send(`dynamic routing ${kuchBhi}`)
})

app.get("/profile/:username/:age",(req,res)=>{
    const {username,age}=req.params
    res.send(`route ${username}/${age}`)
})



//always use in last for error middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        status: err.status || 500,
    });
});


app.listen(3000)