const path =require('path');

console.log("Directory name (Absolute path from current running file): ",path.dirname(__filename))
console.log("File name (current running file name): ",path.basename(__filename))

console.log("file extension name (from current running file): ",path.extname(__filename))

// join and create path
const joinPath=path.join("user","rohit","projects","react","blog");
console.log("joined path: ",joinPath);


// resolve path

const resolvePath=path.resolve("GitHub","cmrohityadav.github.io","projects","12_08Mar23_lightOnOff");
console.log("Resolve path: ",resolvePath);