import mongoose, { Schema,Document } from 'mongoose';

interface iForUserSchema extends Document{
    name:string;
    email:string;
    age:number;
}
const UserSchema= new Schema<iForUserSchema>({
    name:String,
    email:String,
    age:Number,
});

const UserCollection=mongoose.model<iForUserSchema>('User',UserSchema);
export {UserCollection,iForUserSchema};