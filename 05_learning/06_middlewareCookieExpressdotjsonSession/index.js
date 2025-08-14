import express from "express";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(function(req,res,next){
    console.log("Middleware doing critical operations")

    next()
})


app.use(function(req,res,next){
    console.log("middleware 2 working ek baar auur")
    next()
})

function middlewareCheckAdmin(req,res,next){
    console.log("Admin varifying using db call...")
    next()
}
app.get("/admin",middlewareCheckAdmin,(req,res)=>{
    res.send("U are  verified ADMIN")
})

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



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        status: err.status || 500,
    });
});


app.listen(3000)