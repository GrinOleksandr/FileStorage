
const FileStorageDb = require('../DB/fileStorageDB.js'),
    config = require('../config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    moment = require('moment'),
    url = require('url'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    suid = require('rand-token').suid;




const fileRouter = express.Router();
fileRouter.use(bodyParser.json());
/////////////////////////////////////FILE Downloads///////////////////////////////////////////////
fileRouter.use('/download', function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    FileStorageDb.find({name: parsedUrl.query.id}, function (err, file) {
        if (err) return console.log(err);
        if (file) {
            fs.readFile(`${config.fileStoragePath}${file.name}`, function (err, data) {
                if (err) {
                    return res.status(500).send(err);
                }
                res.end(data);
                console.log('download is completed')
            });
        }
    });

});







/////////////////////////////////////FILE UPLOADS///////////////////////////////////////////////
fileRouter.use(fileUpload());
fileRouter.use('/upload', function (req, res) {
    if (Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    else if (Array.isArray(req.files.fileInput)) {
        let uploadedFiles = req.files.fileInput;
        uploadedFiles.forEach(function (item) {
            if (item.mimetype) {
                item.fileId = suid(16);
                uploadFile(item);
                addFileToDataBase(item);
            }
        });
    }
    else {
        let uploadedFile = req.files.fileInput;
        if (uploadedFile.mimetype) {
            uploadedFile.fileId = suid(16);
            uploadFile(uploadedFile);
            addFileToDataBase(uploadedFile);
            console.log(uploadedFile);
        }
    }
    console.log('***File uploaded');
    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*"});
    res.end('File uploaded!');
});
fileRouter.use('/createfolder', function (req, res) {
    console.log("folder creation");
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.writeHead(200);
    let folder = {
        name: parsedUrl.query.name,
        fileId: suid(16),
        isFolder: true,
        mimetype: "folder",
        link: `${config.ip}:${config.port}/${parsedUrl.query.name}`,
        uploadDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
        owner: "SashaGrin",
        access: "SashaGrin",
        parent: parsedUrl.query.parrent
    };

    console.log(folder);

    addFileToDataBase(folder);

    res.end();
    console.log('folder created')
});
fileRouter.use('/rename', function (req, res) {
    console.log("renaming");
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("renaming",parsedUrl.oldname,  parsedUrl.newname);
    res.writeHead(200);

    rename(parsedUrl.oldname, parsedUrl.newname);

    res.end();
    console.log('folder created')
});
function uploadFile(file) {
    file.mv(`${config.fileStoragePath}${file.fileId}`, function (err) {
        if (err)
            return res.status(500).send(err);
    });
}
function addFileToDataBase(target) {
    console.log(target.name);
    let name = target.name || "unnamed",
        fileId = target.fileId,
        mimetype = target.mimetype || "",
        link = target.link || `${config.ip}:${config.port}/${target.name}`,
        date = moment().format('MMMM Do YYYY, h:mm:ss a'),
        owner = target.owner || "SashaGrin",
        access = target.access || [],
        isFolder = target.folder || false,
        parent = target.parent || "/";

    FileStorageDb.create(
        {
            name: name,
            fileId: fileId,
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

function rename(oldName, newName){
    FileStorageDb.updateOne({name:oldName}, {name:newName}, function (err) {
            if (err) return console.log(err);
        })
}


module.exports = fileRouter;

