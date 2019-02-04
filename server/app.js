'use strict';
const FilesStorageDb = require('./db'),
    config = require('./config'),
    app = require('express')(),
    bodyParser = require('body-parser');

// server Setup
const http = require('http'),
    url = require('url');
    // port = 8000,
    // ip = '127.0.0.1';

app.post ('/add', function(request,response) {
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
// server.listen(config.port,config.ip);

console.log(`*****Server running at ${config.ip}:${config.port}`);


//  SERVER RUN COMMAND
// C:\Users\SCV\Dev\FileStorage\node_modules\.bin\nodemon --inspect  ../../server/app.js

