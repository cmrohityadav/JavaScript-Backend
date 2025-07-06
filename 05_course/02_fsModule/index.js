const fs =require('fs')
const path=require('path')

//|||||||||| basic of file ||||||||||||||||||

/*

fs.writeFile("hello.txt","hello world from node",function(err){
    if(err)console.error(err)
    else console.log("done")
})

fs.appendFile("hello.txt"," likhe hue file add krna",function(err){
    if(err)console.error(err)
        else console.log("done")
})

fs.rename("hello.txt","rohit.txt",function(err){
    if(err)console.error(err)
        else console.log(" rename done")
})

fs.copyFile("rohit.txt","./copyFolder/yadav.txt",function(err){
    if(err)console.error(err)
    else console.log(" copying to another folder  done")
})


//to delete file

fs.unlink("rohit.txt",function(err){
    if(err)console.error(err)
    else console.log(" deletion done")
})


//to delete folder
fs.rm("./rohittemp",{recursive:true},function(err){
    if(err)console.error(err)
    else console.log("delete folder done")
})

//to create folder
fs.mkdir("./rohittemp",function(err){
    if(err)console.error(err)
    else console.log("create folder done")
})

*/
//||||||||||||||||| Using of fs and path module |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ||||| SYNC WAY |||||||||||||||||||||

const dataFolderPath=path.join(__dirname,"data");
if(!fs.existsSync(dataFolderPath)){
    fs.mkdirSync(dataFolderPath);
    console.log("data folder created");
}

const filePath=path.join(dataFolderPath,'rohitinfo.txt');

// sync way of creating the file

fs.writeFileSync(filePath,'this text data to filepath');
console.log(`${filePath} created`);


// sync way of reading file

const contentFromFileRead=fs.readFileSync(filePath);
// it returns a Buffer (a raw binary representation of the file)
// const contentFromFileRead = fs.readFileSync(filePath, 'utf-8');

console.log("Buffer format : ",contentFromFileRead);
console.log("String format :",contentFromFileRead.toString())


// sync way of adding content to file (appending to last of its existing content)

const appendedContentToFile=fs.appendFileSync(filePath,'\n this appended data');
// Synchronously append data to a file, creating the file if it does not yet exist. data can be a string or a Buffer



// |||||||||| ASYNC way||||||||||||||||||||||||||

