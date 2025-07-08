import { Router } from "express";
import { addNewBook, deleteBook, getAllBooks, getSingleBookById, updateBook } from "../controllers/BookController";

const routerBook=Router();

routerBook.get('/get',getAllBooks);
routerBook.get('/get/:id',getSingleBookById);
routerBook.post('/add',addNewBook);
routerBook.put('/update/:id',updateBook);
routerBook.get('/delete/:id',deleteBook);


export {routerBook}

