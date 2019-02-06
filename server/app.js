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

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    console.log(req.files);
    let sampleFile = req.files.sampleFile;
    console.log(sampleFile.name);
    // console.log(sampleFile);
    // console.log(req.files[2]);
    // console.log(req.files[3]);
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`${__dirname}/filestorage/${req.files.sampleFile.name}`, function(err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
});





app.use ('/add', function(request,response) {
    // response.send('HelloWorld');
    response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
    let parsedUrl = url.parse(request.url, true);

    let targetName = parsedUrl.query.name;
    let targetType = parsedUrl.query.type;
    FilesStorageDb.create({name: targetName, type: targetType}, function (err) {
        if (err) return console.log(err);
        let responseString = ` OK ${JSON.stringify({name: targetName, type: targetType})}`;
        console.log(responseString);
        response.end(responseString);
    });

});

app.use ('/getfiles', function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
    FilesStorageDb.find({})
             .select('-_id -__v')
             .exec(function(err,Result){

            // console.log(Result[0].toString());
            let responseString =  JSON.stringify(Result);
            console.log(responseString);
                 response.end(responseString);

        });
});

////////////////////////////////////////////////////////EXPERIMENT!
app.use ('/test', function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});

    let responseString = request.files;
    console.log(responseString);
    response.end(responseString);

});










////////////////////////////////////////////////////////EXPERIMENT!



//Files handlers
//
// app.use('/readfile', 'utf8', function(request,response){
//     let parsedUrl = url.parse(request.url, true);
//     let file = `../../server/${parsedUrl.query.name}`;
//     fs.readFile(file, function(err, data){
//         if(err) throw err;
//         console.log(path.resolve(__dirname, 'server'));
//         response.send(data);
//     })
//
// });


// app.use('/upload', function(request, response){
//     response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
//
//
//     let uploadedFile = request.files.uploadedFile;
//     console.log(uploadedFile);
//     uploadedFile.mv(`/123.txt`, function(err){
//         if (err)
//             return response.status(500).send(err);
//
//         response.send('File uploaded!');
//     });
//     // let responseString = request.files;
//     // console.log(responseString);
//     // response.end(responseString);
//     // console.log("File UPLOADED!!")
// });














// let responseString;
// let server = http.createServer((request, response) => {
//     let parsedUrl = url.parse(request.url, true);
//
//     response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
//
//     if (parsedUrl.pathname === "/add") {
//         let targetName = parsedUrl.query.name;
//         let targetType = parsedUrl.query.type;
//         FilesStorageDb.create({name: targetName, type: targetType}, function (err) {
//             if (err) return console.log(err);
//              responseString = ` OK ${JSON.stringify({ name: targetName, type: targetType})}`;
//             response.end(responseString);
//         });
//
//     }
//     if (parsedUrl.pathname === "/get") {
//          FilesStorageDb.find({})
//              .select('-_id -__v')
//              .exec(function(err,Result){
//
//             // console.log(Result[0].toString());
//             responseString =  JSON.stringify(Result);
//             console.log(responseString);
//                  response.end(responseString);
//
//         });
//     }
// });
app.listen(config.port,config.ip);

console.log(`*****Server running at ${config.ip}:${config.port}`);


//  SERVER RUN COMMAND
// C:\Users\SCV\Dev\FileStorage\node_modules\.bin\nodemon --inspect  ../../server/app.js

