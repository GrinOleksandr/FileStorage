'use strict';
const FilesStorageDb = require('./db'),
    config = require('./config'),
    express = require('express'),
    app =express(),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload');

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
            item.mv(`${__dirname}/filestorage/${item.name}`, function (err) {
                if (err)
                    return res.status(500).send(err);
            });
            console.log(item)
        });
    }
    else {
        let uploadedFiles = req.files.fileInput;
        uploadedFiles.mv(`${__dirname}/filestorage/${req.files.fileInput.name}`, function (err) {
            if (err)
                return res.status(500).send(err);
        });
    }
    res.send('File uploaded!');
});

app.use ('/getfiles', function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
    FilesStorageDb.find({})
        .select('-_id -__v')
        .exec(function (err, Result) {
            let responseString = JSON.stringify(Result);
            console.log(responseString);
            response.end(responseString);
        });
});

app.listen(config.port,config.ip);

console.log(`*****Server running at ${config.ip}:${config.port}`);


// app.use ('/add', function(request,response) {
//     // response.send('HelloWorld');
//     response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
//     let parsedUrl = url.parse(request.url, true);
//     let targetName = parsedUrl.query.name;
//     let targetType = parsedUrl.query.type;
//     FilesStorageDb.create({name: targetName, type: targetType}, function (err) {
//         if (err) return console.log(err);
//         let responseString = ` OK ${JSON.stringify({name: targetName, type: targetType})}`;
//         console.log(responseString);
//         response.end(responseString);
//     });
// });









////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  SERVER RUN COMMAND
// C:\Users\SCV\Dev\FileStorage\node_modules\.bin\nodemon --inspect  ../../server/app.js
///////////////////////////////////////////////////////////////////////////////////////////////////////////
