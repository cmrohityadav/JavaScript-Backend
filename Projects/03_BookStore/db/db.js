import mongoose from "mongoose"
const dbName="bookstore"
const connectDb=async()=>{
    try {
        const connecttion=await mongoose.connect(`mongodb://localhost:27017/${dbName}`);
        console.log(`DB connected : ${connecttion.connection.host}`);
        
    } catch (error) {
        console.error("Error in ConnectDb(): ",error);
        process.exit(1);
    }

}

export {connectDb};