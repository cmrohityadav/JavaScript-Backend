const dotenv =require('dotenv');
dotenv.config();
const express=require('express');
const app=express();
const PORT=process.env.PORT || 3000;
const {configureCors} =require('./config/corsConfig');

// express json middleware
app.use(configureCors());
app.use(express.json());




app.listen(PORT,(error)=>{
    if(error) throw error;
    else{
        console.log(`Server is running on PORT ${PORT}`);
    }

});