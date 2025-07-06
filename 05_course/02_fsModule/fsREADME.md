# File System Operations in Node.js

```js
const path = require('path');
const fs = require('fs');
```

## Create Folder if It Doesn’t Exist
- To ensure a directory exists, you can check and create it synchronously
```js
const dataFolderPath = path.join(__dirname, "data");
console.log("dataFolderPath:", dataFolderPath);
// Output: /Users/yourname/project/data (platform-specific)
// Return type: string

if (!fs.existsSync(dataFolderPath)) {
    fs.mkdirSync(dataFolderPath);
    console.log("data folder created");
    // Output: data folder created
}
// fs.existsSync returns a boolean
// fs.mkdirSync returns undefined



```
# Write File Synchronously
```js
const filePath = path.join(dataFolderPath, 'rohitinfo.txt');
console.log("filePath:", filePath);
// Output: /Users/yourname/project/data/rohitinfo.txt
// Return type: string

fs.writeFileSync(filePath, 'this text data to filepath');
// Output: (no output)
// Return type: undefined

console.log(`${filePath} created`);
// Output: /Users/yourname/project/data/rohitinfo.txt created

```
# Read File Synchronously

```js
const contentFromFileRead = fs.readFileSync(filePath);
console.log("Buffer format:", contentFromFileRead);
// Output: <Buffer 74 68 69 73 20 74 65 78 74 20 64 61 74 61 20 74 6f 20 66 69 6c 65 70 61 74 68>
// Return type: Buffer

console.log("String format:", contentFromFileRead.toString());
// Output: this text data to filepath
// Return type: string

```

# Append Content Synchronously

```js
fs.appendFileSync(filePath, '\n this appended data');
// Output: (no output)

// Return type: undefined

const updatedContent = fs.readFileSync(filePath, 'utf-8');
console.log("Updated file content:", updatedContent);
// Output:
// this text data to filepath
//  this appended data

// Return type: string

```

```js


```