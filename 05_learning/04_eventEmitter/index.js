const eventEmitter = require('events');

const myFirstEmitter= new eventEmitter();

// register a listener
myFirstEmitter.on('greet',(name)=>{
    console.log(`Namastey ${name}`);
});

myFirstEmitter.emit('greet',"Rohit Yadav")