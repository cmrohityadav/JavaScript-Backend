require('dotenv').config();
const express=require('express');
const cors=require('cors');
const Redis=require('ioredis');
const helmet=require('helmet');
const {rateLimit}=require('express-rate-limit');
const {RedisStore}=require('rate-limit-redis');
const logger=require('./utils/logger')
const app=express();
const proxy=require('express-http-proxy');
const errorHandler = require('./middleware/errorHandler');

const PORT=process.env.PORT || 3000;

const redisClient= new Redis(process.env.REDIS_URL);

app.use(helmet());
app.use(cors());
app.use(express.json());

//rate limiting
const rateLimitingExpress=rateLimit({
    windowMs:15*60*1000,
    max:100,
    standardHeaders:true,
    legacyHeaders:false,
    handler:(req,res)=>{
        logger.warn(`Sensitive endpoints rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            success:false,
            message:'Too many requests'
        })
    },
    store:new RedisStore({
        sendCommand:(...args)=>redisClient.call(...args),
    }),
})


app.use(rateLimitingExpress);

app.use((req,res,next)=>{
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Request body, ${req.body}`);

    next();
});


const proxyOptions={
    proxyReqPathResolver:(req)=>{
        return req.originalUrl.replace(/^\/v1/,'/api');
    },
    proxyErrorHandler:(err,res,next)=>{
        logger.error(`Proxy error: ${err.message}`);
        res.status(500).json({
            message:`Internal server error while prxoy at api gateway`,
            error:err.message
        })
    }
}

// setting up proxy for our identity services

app.use('/v1/auth',proxy(process.env.IDENTITY_SERVICE_URL,{
    ...proxyOptions,
    proxyReqOptDecorator:(proxyReqOpts,srcReq)=>{
        proxyReqOpts.headers["Content-Type"]="application/json"

        return proxyReqOpts
    },
    userResDecorator:(proxyRes,proxyResData,userReq,userRes)=>{
        logger.info(`Response recieved from Identity service : ${proxyRes.statusCode}`);
        return proxyResData;
    }
}));

/**
 *  apiGateway -> /v1/auth/register -> 3000
 *  identity   -> /api/auth/register -> 3001
 * 
 * localhost:3000/v1/auth/register -> localhost:3001/api/auth/register
 * 
 */

app.use(errorHandler);

app.listen(PORT,()=>{
    logger.info(`API Gateway is running on port ${PORT}`);
    logger.info(`identity Service is running on ${process.env.IDENTITY_SERVICE_URL}`);
    logger.info(`Redis Url ${process.env.REDIS_URL}`);
})


