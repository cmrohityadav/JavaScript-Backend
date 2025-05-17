const express = require('express')


const app = express();
app.use(express.json())


app.post("/uploadHere", (req, res) => {
    res.send("")
})


const multer = require('multer')

// Saves it to the uploads/ folder with a random auto-generated filename (not original name).
const upload = multer({ dest: 'uploads/' })



// upload.single('avatar')
// This is a Multer middleware that handles single file upload.
// 'avatar' refers to the form field name for the file.
// If the user uploads a file via a form like:
// <input type="file" name="avatar" />
app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file)
})






//just reading file from uploaded file from client

const fs = require('fs');
const path = require('path');

app.post('/uploadtext', upload.single('txtfile'), (req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded");

    const filePath = path.join(__dirname, req.file.path);
    /* __dirname
    A global variable in Node.js.
    It gives you the absolute path of the current file's directory.
    Example: If your file is D:/projects/app/server.js, then __dirname is D:/projects/app.

    const root = __dirname; // e.g., D:/myapp
    const folder = 'uploads';
    const filename = 'file.txt';

    const finalPath = path.join(root, folder, filename);

    console.log(finalPath); 
    // ✅ Output on Windows: D:\myapp\uploads\file.txt
    // ✅ Output on Linux/macOS: /home/user/myapp/uploads/file.txt
    */


    console.log("file path: ", filePath)
    // Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file");
        }

        console.log("File contents:", data);
        res.status(200).send(`File content:\n\n${data}`);
    });
});




//customize way to give file name ans where to store

const storage = multer.diskStorage({

    // Controls where the uploaded files go.
    destination: function (req, file, cb) {

        if (file.mimetype === 'image/png') {
            cb(null, 'uploaddisk/images')
        } else if(file.mimetype=='text/plain') {
            cb(null, 'uploaddisk/txt/')
        }else{
        cb(null, 'uploaddisk/temp'); // ✅ where to store files

        }


    },

// Controls how the uploaded file should be named.
    filename: function (req, file, cb) {
        console.log("file: ",file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+path.extname(file.originalname);
        
        cb(null, file.fieldname + '-' + uniqueSuffix); // ✅ file name logic
    }
});

const upload2 = multer({ storage: storage })

app.post("/diskupload2",upload2.single("diskfile"),(req,res)=>{

     if (!req.file) return res.status(400).send("No file uploaded");

    const filePath = path.join(__dirname, req.file.path);
   

    console.log("file path: ", filePath)
    // Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file");
        }

        console.log("File contents:", data);
        res.status(200).send(`File content:\n\n${data}`);
    });
})

app.listen(3000, () => {
    console.log("server is running")
})


