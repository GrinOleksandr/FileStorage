'use strict';
const FileStorageDb = require('./db'),
    config = require('./config'),
    express = require('express'),
    app =express(),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    moment = require('moment'),
    typeIs = require('type-is'),
    tmp = require('tmp'),
    util = require('util');


///////// server Setup
const http = require('http'),
    url = require('url'),
    fs = require('fs'),
    path = require('path');
////////////////////////////////


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
            if(item.mimetype) {
                uploadFile(item);
                addFileToDataBase(item);
            }
        });
    }
    else {

            let uploadedFile = req.files.fileInput;
        if(uploadedFile.mimetype) {
            uploadFile(uploadedFile);
            addFileToDataBase(uploadedFile);
        }
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

function addFileToDataBase(target) {
    let name = target.name || "unnamed",
        mimetype = target.mimetype || "",
        link = target.link || `${config.ip}:${config.port}/${target.name}`,
        date = moment().format('MMMM Do YYYY, h:mm:ss a'),
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

app.use('/readfile', function(req,res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'image/JPEG');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    console.log('Try to download');
    // fs.readFile(`${config.fileStoragePath}${parsedUrl.query.name}`, 'utf8', function(err, data){
    fs.readFile(`${config.fileStoragePath}image2.JPG`,  function (err, data) {
        if (err) {
            return res.status(500).send(err);
        }
        // res.send('THIS IS MY FILE NAME!');
        res.end(data);
        console.log('download is completed')
    });
});

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
console.log(`*****${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
console.log(`*****Server running at ${config.ip}:${config.port}`);




// app.use('/getme', function(req,res){
//     let parsedUrl = url.parse(req.url, true);
//     res.writeHead(200, {
//         'Content-Type': "text/plain",
//         'Access-Control-Allow-Origin': "*",
//         'Content-Disposition': 'attachment'
//     });
//     // ;filename=output.jpg'
//     console.log(parsedUrl.query.name);
//     let myReadStream = fs.createReadStream(`${config.fileStoragePath}raskraska_dlya_detei_3_let1.jpg`, 'utf8', function(err, data){
//         if (err)
//             return res.status(500).send(err);
//
//     });
//     let myWriteStream = fs.createWriteStream(`${config.fileStoragePath}123.jpg`);
//     myReadStream.pipe(myWriteStream);
//     // res.readFile(`${config.fileStoragePath}raskraska_dlya_detei_3_let1.jpg`)
// });
/////////////////////////////////////FILE UPLOADS///////////////////////////////////////////////














////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  INSPECTOR RUN COMMAND
//C:\Users\SCV\Dev\FileStorage\node_modules\.bin\nodemon --inspect -w C:\Users\SCV\Dev\FileStorage\server\  C:\Users\SCV\Dev\FileStorage\server\app.js --inspect
///////////////////////////////////////////////////////////////////////////////////////////////////////////

