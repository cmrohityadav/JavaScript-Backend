const express =require('express');
const { aysncHandler, APIError } = require('../middleware/errorHandler');

const itemRouter=express.Router();
const item=[
  { id: 1, name: 'Item k9d3' },
  { id: 2, name: 'Item 8sdq' },
  { id: 3, name: 'Item po3x' },
  { id: 4, name: 'Item 2lrm' },
  { id: 5, name: 'Item 1zqk' }
]
itemRouter.get('/items',aysncHandler(async(req,res)=>{
    res.json(item)
}))


itemRouter.post('/items',aysncHandler(async(req,res)=>{
  if(!req.body.name){
    throw new APIError("Provide item name",400);
  }

  const newItem={
    id:item.length+1,
    name:req.body.name,
  }

  item.push(newItem);

  return res.status(200).json({
    item:newItem,
    message:'item added'
  });

}))


module.exports=itemRouter