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
    util = require('util'),
    fileRouter = require('./fileRouter.js'),
    http = require('http'),
    url = require('url'),
    fs = require('fs'),
    path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'../public'));
});

// const fileRouter = express.Router();
///////// server Setup

////////////////////////////////
app.get("/testtest", function(req,res){
    res.end('dfdfsfdsfdsfsd');
});
app.use(bodyParser.json());
app.use("/file", fileRouter);

//////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////
app.listen(config.port,config.ip);
console.log(`*****${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
console.log(`*****Server running at ${config.ip}:${config.port}`);















////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  INSPECTOR RUN COMMAND
//C:\Users\SCV\Dev\FileStorage\node_modules\.bin\nodemon --inspect -w C:\Users\SCV\Dev\FileStorage\server\  C:\Users\SCV\Dev\FileStorage\server\app.js --inspect
///////////////////////////////////////////////////////////////////////////////////////////////////////////

