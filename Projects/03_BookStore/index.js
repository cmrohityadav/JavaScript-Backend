import dotenv from 'dotenv'
dotenv.config();
import { connectDb } from './db/db.js';
import { app } from './app.js';

connectDb().then(()=>{
    const PORT=process.env.PORT || 4000;
    app.listen(PORT,()=>{
        console.log(`Server is up and running on port ${PORT}`);
    })
}).catch((error)=>{
    console.error(`Connection to db failed, shut dowing server`);
    console.error(error);
    process.exit(1)
})