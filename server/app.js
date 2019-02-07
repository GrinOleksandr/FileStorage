'use strict';
const FileStorageDb = require('./db'),
    config = require('./config'),
    express = require('express'),
    app =express(),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    moment = require('moment');

// server Setup
const http = require('http'),
    url = require('url'),
    fs = require('fs'),
    path = require('path');

app.use(bodyParser.json());

app.use(fileUpload());

app.use('/upload', function(req, res) {
    if (Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    else if(Array.isArray(req.files.fileInput)){
        console.log(req.files);
        let uploadedFiles = req.files.fileInput;
        uploadedFiles.forEach(function (item) {
            uploadFile(item);
            addFileToDataBase(item);
        });
    }
    else {
        let uploadedFile = req.files.fileInput;
        uploadFile(uploadedFile);
        addFileToDataBase(uploadedFile);
    }
    console.log('***File uploaded');
    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*"});
    res.end('File uploaded!');
});
function uploadFile(file){
    file.mv(`${config.fileStoragePath}${file.name}`, function (err) {
        if (err)
            return res.status(500).send(err);
    });

}

app.use ('/getfiles', function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
    FileStorageDb.find({})
        .select('-_id -__v')
        .exec(function (err, Result) {
            let responseString = JSON.stringify(Result);
            console.log(responseString);
            response.end(responseString);
        });
});

app.listen(config.port,config.ip);

console.log(`*****Server running at ${config.ip}:${config.port}`);
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));


function addFileToDataBase(target) {
        let name = target.name || "unnamed",
            mimetype = target.mimetype || "",
            link = target.link || `${config.ip}:${config.port}/${target.name}`,
            date =moment().format('MMMM Do YYYY, h:mm:ss a'),
            owner = target.owner || "SashaGrin",
            access = target.access || owner,
            isFolder = target.folder || false,
            parent = target.parent || "/";

        FileStorageDb.create(
            {
                name: name,
                mimetype: mimetype,
                link: link,
                uploadDate: date,
                owner: owner,
                access: access,
                parent: parent,
                folder: isFolder,

            }, function (err) {
            if (err) return console.log(err);
        })

}









////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  SERVER RUN COMMAND
// C:\Users\SCV\Dev\FileStorage\node_modules\.bin\nodemon --inspect  ../../server/app.js
///////////////////////////////////////////////////////////////////////////////////////////////////////////
