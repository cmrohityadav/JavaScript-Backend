const express =require('express');
const { aysncHandler } = require('../middleware/errorHandler');

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


module.exports=itemRouter