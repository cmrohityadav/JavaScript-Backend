const http=require('http');

const server=http.createServer((req,res)=>{
    const url=req.url;
    if(url==='/'){
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.write("This home page");
        res.end("end");
    }else if(url==='/projects'){
        res.writeHead(200,{'content-type':'text/plain'});
        res.write("this is main projects route");
        res.end();
    }else{
        res.writeHead(404,{'content-type':'text/plain'});
        res.write("Opps!!! this page is not avalaible");
        res.end();
    }

})

const PORT=4000;
server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})