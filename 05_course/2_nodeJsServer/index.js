const http=require('http')

const server=http.createServer(function(req,res){
    res.end("hello world first server from node js")
})

server.listen(3000)