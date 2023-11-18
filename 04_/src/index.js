// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
dotenv.config({
    path:'./env'
})

import connectDB from "./db/index.js";

connectDB()









/*

import moongose from "mongoose";
import { DB_NAME } from "./constants";
import express from 'express';
const app= express();

;(async ()=>{
    try {
       await moongose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("error",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`app is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("error",error);
        throw error;
    }
})()

*/