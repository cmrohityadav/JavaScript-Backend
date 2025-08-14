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
## Delete File or Folder Synchronously
```js
const deleteFilePath = path.join(__dirname, "data", "rohitinfo.txt");

if (fs.existsSync(deleteFilePath)) {
    fs.unlinkSync(deleteFilePath);
    console.log("File deleted synchronously");
    // Output: File deleted synchronously
}
// fs.unlinkSync deletes a file
// Return type: undefined

```
## Read Directory Synchronously

```js
const folderFiles = fs.readdirSync(__dirname);
console.log("Files in current directory:", folderFiles);
// Output: [ 'index.js', 'data', 'asyncFolder', ... ]
// Return type: string[]

```

```js


```

# Async Way

## Create Folder Asynchronously If It Doesn’t Exist
```js
const asyncFolderPath = path.join(__dirname, "asyncFolder");
console.log("asyncFolderPath:", asyncFolderPath);
// Output: /Users/yourname/project/asyncFolder
// Return type: string

fs.access(asyncFolderPath, (err) => {
    if (err) {
        fs.mkdir(asyncFolderPath, (err) => {
            if (err) throw err;
            console.log("asyncFolder created");
            // Output: asyncFolder created
        });
    }
});
// fs.access checks if folder exists (error = not found)
// fs.mkdir creates the folder if not found
// Return type (both): undefined (via callback)

```

## Write File Asynchronously
```js
const asyncFilePath = path.join(asyncFolderPath, "asyncDemoFile.txt");
console.log("asyncFilePath:", asyncFilePath);
// Output: /Users/yourname/project/asyncFolder/asyncDemoFile.txt
// Return type: string

const writeFileReturnValue = fs.writeFile(
    asyncFilePath,
    "my data into asyncDemoFile.txt via async method",
    (err) => {
        if (err) throw err;
        console.log("Async way file is created");
        // Output: Async way file is created
    }
);

console.log("writeFileReturnValue:", writeFileReturnValue);
// Output: writeFileReturnValue: undefined
// Return type: undefined (because writeFile is async and uses a callback)

```

## Read File Asynchronously
```js
const readFileReturnValue = fs.readFile(asyncFilePath, (err, data) => {
    if (err) throw err;
    console.log("Data reading async way (Buffer):", data);
    // Output: <Buffer ...>
    // Return type: Buffer

    console.log("Data reading async way (String):", data.toString());
    // Output: my data into asyncDemoFile.txt via async method
    // Return type: string
});

console.log("readFileReturnValue:", readFileReturnValue);
// Output: readFileReturnValue: undefined
// Return type: undefined (fs.readFile is async)

```

## Append Content Asynchronously
```js
fs.appendFile(
    asyncFilePath,
    '\nnew data added to async folder file via async method',
    (err) => {
        if (err) throw err;
        console.log("Data appended asynchronously");
        // Output: Data appended asynchronously
    }
);
// fs.appendFile is asynchronous and does not return anything directly
// Return type: undefined

```
## Delete File or Folder Asynchronously

```js
const asyncDeletePath = path.join(__dirname, "asyncFolder", "asyncDemoFile.txt");

fs.unlink(asyncDeletePath, (err) => {
    if (err) throw err;
    console.log("File deleted asynchronously");
    // Output: File deleted asynchronously
});
// fs.unlink deletes a file (async)
// Return type: undefined (via callback)

```
## Read Directory Asynchronously
```js
fs.readdir(__dirname, (err, files) => {
    if (err) throw err;
    console.log("Files (async):", files);
    // Output: Files (async): [ 'index.js', 'data', 'asyncFolder', ... ]
});
// fs.readdir reads folder contents (async)
// Return type: undefined (files come via callback)

```
## Check File or Folder Type Asynchronously

```js
const checkPath = path.join(__dirname, "data");

fs.stat(checkPath, (err, stats) => {
    if (err) throw err;
    console.log("Is File?", stats.isFile());        // false
    console.log("Is Directory?", stats.isDirectory()); // true
});
// fs.stat gives file info (async)
// Return type: undefined (stats object via callback)

```
```js


```
```js


```
```js


```
```js


```