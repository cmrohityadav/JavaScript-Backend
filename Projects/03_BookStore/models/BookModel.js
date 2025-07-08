import mongoose, { model, Schema } from "mongoose";


const bookSchema=new Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
        trim:true,
        maxLength:[100,'Book title cannot be more than 100 char'],
    },
    author:{
        type:String,
        required:[true,"author name is required"],
        trim:true,
    },
    year:{
        type:Number,
        required:[true, 'publication year is required'],
        min:[1000,'Year cant be below 1000'],
        max:[new Date().getFullYear(),'Year can not be in the future']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const  BookCollection=model('book',bookSchema);
export default BookCollection;

