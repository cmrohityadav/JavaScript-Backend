// object -> handle binary data
// file system operations,cryptography, image processing


const fs = require('fs');

// 1️⃣ Create a Buffer with fixed size
const bufferOne = Buffer.alloc(10); // 10 bytes of zero
console.log("bufferOne:", bufferOne);


// 2️⃣ Write data to it
bufferOne.write("hey Rohit");
console.log("bufferOne after write:", bufferOne);
console.log("bufferOne.toString():", bufferOne.toString());

// 3️⃣ Create Buffer from existing string
const bufferFromString = Buffer.from("Rohit");
console.log("bufferFromString:", bufferFromString);
console.log("bufferFromString.toString():", bufferFromString.toString());

// 4️⃣ Concatenate buffers
const bufferA = Buffer.from("Hello, ");
const bufferB = Buffer.from("World!");
const bufferConcat = Buffer.concat([bufferA, bufferB]);
console.log("Concatenated Buffer:", bufferConcat.toString());

// 5️⃣ Slice buffer (without copying)
const sliced = bufferConcat.slice(7); // 'World!'
console.log("Sliced Buffer:", sliced.toString());

// 6️⃣ Compare buffers (useful in crypto)
const bufferX = Buffer.from("abc");
const bufferY = Buffer.from("abc");
console.log("Buffers equal:", bufferX.equals(bufferY)); // true

// 7️⃣ Copy buffer contents
const bufferCopy = Buffer.alloc(bufferX.length);
bufferX.copy(bufferCopy);
console.log("Copied Buffer:", bufferCopy.toString());

// 8️⃣ Read/write binary data (simulate image or file chunk)
const binaryBuffer = Buffer.from([0x48, 0x65, 0x6C, 0x6C, 0x6F]); // ASCII for 'Hello'
console.log("Binary Buffer:", binaryBuffer.toString());

// 9️⃣ Write buffer to a file (common in file I/O)
fs.writeFileSync('output.txt', bufferConcat);
console.log("Wrote buffer to output.txt");


