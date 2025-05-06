import mongoose, { Schema } from "mongoose";

const postSchema=Schema({
    user:{
      type:  Schema.Types.ObjectId,
      ref:'user'
    },
    date:{
        type:Date,
        default:Date.now
    },
    content:{
        type:String
    },
    likes:[
        {type:Schema.Types.ObjectId,
            ref:'user'
        }
    ]
});

const postTable=mongoose.model('post',postSchema);

export default postTable;