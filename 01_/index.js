// console.log("hello Rohit ")

require('dotenv').config()
const express = require('express') //common js synchronus
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/twitter',(req,res)=>{
    res.send('cmrohityadav')
})

app.get('/login',(bhikh,daan)=>{
    daan.send('<h1 style=color:red> Daan kro yaaro login kar ke<h1>')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})