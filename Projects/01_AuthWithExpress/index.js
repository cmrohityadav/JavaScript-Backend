import dotenv from "dotenv"
dotenv.config({
    path:'./env'
})
const PORT=process.env.PORT 
import { app } from "./app.js"
import connectDatabase from "./db/databaseConnection.js"



connectDatabase()
.then(()=> {
    app.listen(PORT,()=>{
        console.log(`server is running on port http://localhost:${PORT}`)
    })
    app.on("error",(error)=>{
        console.log("error",error);
        throw error
    })
}).catch((err)=>{
    console.log("MONGO db connection failed !!!",err)

})