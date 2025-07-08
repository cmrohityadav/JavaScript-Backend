import express from 'express';
import { routerBook } from './routes/BookRoute';
const app=express();


// middleware
app.use(express.json());



// routes
app.use('/api/book',routerBook);

export {app};