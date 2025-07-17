// basic types

let isDone:boolean=true;

let num:number=21;

let str:string="Rohit";

let arr:number[]=[1,2,3,4];

let students:string[]=["Student1","Student2","Student3"];

let stocks:Array<string>=["TCS","JIO","ADANI"];

let anyType:any=100;
anyType="rohit";
anyType=true;


let thisNull:null=null;

let thisUndefined:undefined=undefined;


enum HttpStatus {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404
}

let resCode:HttpStatus=HttpStatus.NotFound;
console.log(resCode);




// tuples
let tuples:[number,string]=[1,"rohit"]




// interface
// Object shape, Function parameter type, Function type, Array type (index signature), Dynamic keys object, Class contract (implements), Extend/inherit other interfaces, Hybrid type (function + properties), Declaration merging.
interface User{
    name:string;
    id:number;
    email?:string // for optional-> ?
    readonly createdAt:Date  //only read
}

const fbUser:User={
    name:'rohit',
    id:1,
    createdAt:new Date()
}






// types

type Product={
    title:string;
    price:number;
}

const software:Product={
    title:"CRM",
    price:123456
}





// function with type annoatations
function multiply(a:number,b:number):number{
    return a*b;
}

const add=(num1:number,num2:number):number=>{
    return num1+num2;
}

function greet(name:string,greeting?:string):string{

    return `${name} ${greeting}`;
}


