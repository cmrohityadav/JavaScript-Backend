console.log("Hello Nodejs from typescript");
import express,{Express,NextFunction,Request,Response} from 'express';

const app:Express=express();

app.use(express.json());

/** Request<p,ResBody,ReqBody,ReqQuery,Locals>
 * Request<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = QueryString.ParsedQs, Locals extends Record<string, any> 
 * 
 * 
 * 
 * Response<ResBody = any, Locals extends Record<string, any>
 */
app.get("/",(req:Request,res:Response)=>{
    res.send("Hello, TypeScript with Express");
})


// middleware -> add startTime to request
interface CustomRequest extends Request{
    startTime?:number;
}

app.use((req:CustomRequest,res:Response,next:NextFunction)=>{
    req.startTime=Date.now();
    
    next()
})

interface User{
    name:string;
    email:string;
}
app.post('/user',(req:Request<{},{},User>,res:Response)=>{

const {email,name}=req.body;

res.json({
    mesaage:`User created ${name} - ${email}`
})
});



app.get("/user/:id",(req:Request<{id:string}>,res:Response)=>{
    const {id}=req.params;

    res.send(`User id is ${id}}`)
})

const port:number=3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


