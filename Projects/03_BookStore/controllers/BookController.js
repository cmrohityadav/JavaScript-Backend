import BookCollection from "../models/BookModel.js";

const getAllBooks=async(req,res)=>{
    try {
        const allBook= await BookCollection.find();
        if(!allBook){
            res.status(200).json({
            success:false,
            message:'No book avaliable',
            
        }) 
        return;
        }
        res.status(200).json({
            success:true,
            message:'All books',
            data:allBook,
        }) ;
    } catch (error) {
    console.error("Error in getAllBooks():  ",error)
    res.status(400).json({
            success:false,
            message:'got get all book',
            
        }) 
    }

}

const getSingleBookById=async(req,res)=>{

}

const addNewBook=async(req,res)=>{
try {
    const bodyBookData=req.body;
    const responseDocAfterAddingBook=await  new BookCollection(bodyBookData).save();
    if(responseDocAfterAddingBook){
        res.status(200).json({
            success:true,
            message:'Book added successfully',
            data:responseDocAfterAddingBook,
        })
    }
    return;
} catch (error) {

    console.error("Error in addNewBook():  ",error)
    res.status(400).json({
            success:false,
            message:'Book add unsuccessfully',
            
        })
    
}
}

const updateBook=async(req,res)=>{

}

const deleteBook=async(req,res)=>{

}

export {getAllBooks,getSingleBookById,addNewBook,updateBook,deleteBook}