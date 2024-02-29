import express from "express";
import cookieParser from "cookie-parser"
import cors from 'cors'
const app=express();

app.use(express.json({limit:"16kb"}));
app.use(cookieParser())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true

}))







// routes import
import AuthRouter from './router/auth.router.js'

app.use("/api/v1/auth",AuthRouter);





export {app}





