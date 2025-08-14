
const moongose=require('mongoose');
const { dbName } = require('../utils/constants');
const logger = require('../utils/logger');

const connectDb=async()=>{
    try {
        const connectInstance= await moongose.connect(`${process.env.MONGODB_URI}/${dbName}`)
        logger.info(`Mongodb connected !! DB Host : ${connectInstance.connection.host}`);
        console.log(`\n Mongodb connected !! DB HOST: ${connectInstance.connection.host}`);
    } catch (error) {
        logger.error('MongoDB connection erro',error);
        console.log("MONGODB connection error",error)
        process.exit(1);
    }
}

module.exports=connectDb;