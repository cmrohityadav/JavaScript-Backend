require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const Redis=require('ioredis');
const cors=require('cors');
const helmet=require('helmet');
const postRoutes=require('./routes/postRoutes');
const errorHandler=require('./middlewares/errorHandler');
const logger=require('./utils/logger');
const connectDb = require('../../identityService/src/database/dbConnect');

const app=express();
const PORT=process.env.PORT || 3002;


connectDb().then(()=>{
    logger.info('connected to mongodb');
}).catch((e)=>{
    logger.error('Mongodb connection error',e);
});

const redisClient= new Redis(process.env.REDIS_URL);

// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Request body , ${req.body}`);
    next();
});



