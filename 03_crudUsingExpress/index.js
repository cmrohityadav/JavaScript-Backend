import 'dotenv/config'
import express from "express"
import logger from './logger.js';
import morgan from 'morgan';

const morganFormat = ':method :url :status :response-time ms';
const app=express()
const port= process.env.PORT || 3000

app.use(express.json())

    let itemData=[]
    let nextId=1
app.use(morgan(morganFormat, {
        stream: {
          write: (message) => {
            const logObject = {
              method: message.split(' ')[0],
              url: message.split(' ')[1],
              status: message.split(' ')[2],
              responseTime: message.split(' ')[3],
      
            };
            logger.info(JSON.stringify(logObject));
          }
        }
      }));    

    // add
app.post("/add",(req,res)=>{
    const {name,price}=req.body
    const newItemData={id:nextId++,name,price};
    itemData.push(newItemData)
    res.status(201).send(newItemData)

})

// get all data item
app.get("/getdata",(req,res)=>{
    res.status(200).send(itemData)
})


// get data with id
app.get("/getdata/:id",(req,res)=>{

   const data= itemData.find(t=>t.id===parseInt(req.params.id))
   if(!data){
    return res.status(400).send("item not found")

   }
   res.status(200).send(data);
})


// update data
app.put("/getdata/:id",(req,res)=>{

    const id=req.params.id
   const data= itemData.find(t=>t.id===parseInt(req.params.id))
   if(!data){
    return res.status(400).send("item not found")

   }

   const {name,price}=req.body
   data.name=name;
   data.price=price
   res.status(200).send(data)

})

//delete data
app.delete("/getdata/:id",(req,res)=>{

 const index=itemData.findIndex(t=>t.id===parseInt(req.params.id))
    if(index===-1){
        return res.status(404).send("item not found")
    }
    itemData.splice(index,1)
    return res.status(200).send("deleted")

})


app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}`)

})