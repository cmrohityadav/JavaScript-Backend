# Path
- The Node.js path module provides utilities for working with file and directory paths in a platform-independent way
- __dirname : Absolute path of the directory containing the current file
eg: /Users/rohit/myapp/src
- __filename: Absolute path to the current file (including file name)
eg: /Users/rohit/myapp/src/index.js

```js
const path = require('path');
```

## path.dirname(__filename)
- Returns the directory name of the path (absolute path to the folder containing the current file)


```js
console.log("Directory name: ", path.dirname(__filename));

// Directory name:  /Users/rohit/Desktop/myProject
```
## path.basename(__filename)
- Returns the last portion of a path — usually the file name with extension

```js
console.log("File name: ", path.basename(__filename));

// File name:  index.js
```
## path.extname(__filename)
- Returns the extension of the path (including the .)
```js
console.log("File extension: ", path.extname(__filename));

// File extension:  .js
```

## path.join([...paths])
- Joins all given path segments using the platform-specific separator (/ or \) into one normalized path string

```js
const joinPath = path.join("user", "rohit", "projects", "react", "blog");
console.log("Joined path: ", joinPath);


// Output (Unix/macOS):
// Joined path:  user/rohit/projects/react/blog


// Output (Windows):
// Joined path:  user\rohit\projects\react\blog

```
## path.resolve([...paths])
- Resolves a sequence of paths or path segments into an absolute path.

If the first segment is not absolute, it uses process.cwd() as the starting point.

```js
const resolvePath = path.resolve("GitHub", "cmrohityadav.github.io", "projects", "12_08Mar23_lightOnOff");
console.log("Resolved path: ", resolvePath);


// Resolved path:  /Users/rohit/GitHub/cmrohityadav.github.io/projects/12_08Mar23_lightOnOff

```

##   path.normalize(path)
- Normalizes the given path, resolving .., ., and removing redundant slashes.

```js
const messyPath = "user//rohit/../rohit/projects//react///blog";
const normalized = path.normalize(messyPath);
console.log("Normalized path: ", normalized);


// Normalized path:  user/rohit/projects/react/blog

```