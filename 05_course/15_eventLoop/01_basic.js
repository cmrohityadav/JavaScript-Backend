
// timers -> pending callbacks -> idle, prepare ->poll -> check -> close callback
const fs=require('fs');
const crypto=require('crypto');

console.log('1. script start');

setTimeout(()=>{
    console.log(`2. setTimeout 0s callback(macroTask)`);
},0);

setTimeout(()=>{
    console.log(`3. setTimeout 0s callback (macrotask)`);
},0);

setImmediate(()=>{
    console.log(`4. setImmediate callback (check)`);

})


Promise.resolve().then(()=>{
    console.log(`5. Promise resolved (microTask)`)
})


process.nextTick(()=>{
    console.log(`6. process.nextTick callback (microTask)`);
})


fs.readFile(__filename,()=>{
    console.log(`7. file read operation (i/o callback)`)
})


crypto.pbkdf2("password",'salt',100000,64,'sha512',(err,key)=>{
    if(err) throw err;
    console.log(`8. pbkdf2 operation completed (CPU intensive task)`)
})


console.log(`9. script ends`)