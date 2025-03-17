const fs =require('fs')

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

