
const FileStorageDb = require('./db'),
    config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    moment = require('moment'),
    url = require('url'),
    fs = require('fs');


const fileRouter = express.Router();
fileRouter.use(bodyParser.json());
/////////////////////////////////////FILE Downloads///////////////////////////////////////////////
fileRouter.use('/download', function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    console.log('Try to download');
    fs.readFile(`${config.fileStoragePath}${parsedUrl.query.name}`, function (err, data) {
        if (err) {
            return res.status(500).send(err);
        }

        res.end(data);
        console.log('download is completed')
    });
});




/////////////////////////////////////FILE UPLOADS///////////////////////////////////////////////
fileRouter.use(fileUpload());
fileRouter.use('/upload', function (req, res) {
    if (Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    else if (Array.isArray(req.files.fileInput)) {
        console.log(req.files);
        let uploadedFiles = req.files.fileInput;
        uploadedFiles.forEach(function (item) {
            if (item.mimetype) {
                uploadFile(item);
                addFileToDataBase(item);
            }
        });
    }
    else {

        let uploadedFile = req.files.fileInput;
        if (uploadedFile.mimetype) {
            uploadFile(uploadedFile);
            addFileToDataBase(uploadedFile);
        }
    }
    console.log('***File uploaded');
    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*"});
    res.end('File uploaded!');
});

function uploadFile(file) {
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

//////////////////////////////////////////// FILE LISTINGS

fileRouter.use ('/getfiles', function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
    FileStorageDb.find({})
        .select('-_id -__v')
        .exec(function (err, Result) {
            let responseString = JSON.stringify(Result);
            console.log(responseString);
            response.end(responseString);
        });
});


module.exports = fileRouter;
