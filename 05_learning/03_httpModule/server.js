const http=require('http');

const server=http.createServer((req,res)=>{
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello from Node.js Server!');
    res.end();
})

const PORT=4000;
server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})