const dotenv =require('dotenv');
dotenv.config();
const express=require('express');
const app=express();
const PORT=process.env.PORT || 3000;
const {configureCors} =require('./config/corsConfig');
const { requestLogger, addTimeStamp } = require('./middleware/customMiddleware');
const { globalErrorHandler } = require('./middleware/errorHandler');
const {urlVersioning}=require('./middleware/apiVersioning')

// express  middleware

app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(express.json());

app.use('/api/v1',urlVersioning('v1'))

app.use(globalErrorHandler);
app.listen(PORT,(error)=>{
    if(error) throw error;
    else{
        console.log(`Server is running on PORT ${PORT}`);
    }

});