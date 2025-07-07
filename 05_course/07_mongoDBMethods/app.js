const express = require('express')
const app = express()
const userModel = require("./usermodel")
const userModelOrCollectionOrTable = require("./usermodel")
app.get("/", (req, res) => {
    res.send("hey")
})

app.get("/create", async (req, res) => {

    //inserting / creating data into collection~table
    let createdUserDocumentOrRow = await userModelOrCollectionOrTable.create({
        name: "rohit",
        email: "rohit@dev.in",
        username: "cmrohityadav"
    })
    /**
     * another way to create collection
      
      const createdUserDocumentOrRow= new userModelOrCollectionOrTable({
      name: "rohit",
        email: "rohit@dev.in",
        username: "cmrohityadav"
      })

     await  createdUserDocumentOrRow.save()

     */
    console.log(createdUserDocumentOrRow)
    res.send(createdUserDocumentOrRow)

})

app.get("/readAll",async(req,res)=>{
    //find return always array even zero size array if not data present
    // eg => []=anytableColl.find({username:"nouser"})
  const userAllCollectionOrRow  =await userModelOrCollectionOrTable.find()

  res.send(userAllCollectionOrRow)
})

app.get("/readOne",async(req,res)=>{
  //it return object(1st doc/row)
  // if not data present nothing return null
  const userAllCollectionOrRow  =await userModelOrCollectionOrTable.findOne({username:"cmrohityadav1"})

  res.send(userAllCollectionOrRow)
})

app.get("/update",async (req, res) => {
   const updatedDocOrRow=await userModelOrCollectionOrTable.findOneAndUpdate({
        // 1st object:: FILTER =>find document~row based on this
        username:"cmrohityadav"
    },
    { //2nd object:: UPDATE =>update this key-value~field~column data
        name:"rahul"
    },
    {
        // 3rd OPTION
        new:true //return document~row is updated one
    })

    res.send(updatedDocOrRow)
})




app.get("/delete",async(req,res)=>{
    const deletedDocRow=await userModelOrCollectionOrTable.findOneAndDelete({username:"cmrohityadav"})

    res.send(deletedDocRow)
})



app.listen(3000, () => console.log("Server is Up"))