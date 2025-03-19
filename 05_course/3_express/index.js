import express from "express";

const app = express();

//Middlewares
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





app.listen(3000)