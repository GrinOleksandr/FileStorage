
const FileStorageDb = require('../DB/fileStorageDB.js'),
    config = require('../config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    moment = require('moment'),
    url = require('url'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    suid = require('rand-token').suid,
    fileRouter = express.Router();

fileRouter.use(bodyParser.json());
fileRouter.use('/listfiles', function(req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
    console.log('rendering filestructure for: ', parsedUrl.query.folder );
    FileStorageDb.find({parent : parsedUrl.query.folder})
        .select('-_id -__v')
        .exec(function (err, Result) {
            let responseString = JSON.stringify(Result);
            res.end(responseString);
        });
});
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
fileRouter.use(fileUpload());
fileRouter.use('/upload', function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl.query.parent);
    if (Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    else if (Array.isArray(req.files.fileInput)) {
        let uploadedFiles = req.files.fileInput;
        uploadedFiles.forEach(function (item) {
            if (item.mimetype) {
                item.fileId = suid(16);
                item.parent = parsedUrl.query.parent;
                uploadFile(item);
                addFileToDataBase(item);
            }
        });
    }
    else {
        let uploadedFile = req.files.fileInput;
        if (uploadedFile.mimetype) {
            uploadedFile.fileId = suid(16);
            uploadedFile.parent = parsedUrl.query.parent;
            uploadFile(uploadedFile);
            addFileToDataBase(uploadedFile);
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
        parent: parsedUrl.query.parent
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
    console.log("renaming",parsedUrl.query.id,  parsedUrl.query.newname);
    res.writeHead(200);

    rename(parsedUrl.query.id,  parsedUrl.query.newname);

    res.end();
});
fileRouter.use('/delete', function (req, res) {
    console.log("deleting");
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("deleting",parsedUrl.query.id);
    res.writeHead(200);

    deleteItem(parsedUrl.query.id);

    res.end();
    console.log('item deleted')
});
fileRouter.use('/getelement', function(req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
    console.log('rendering filestructure for: ', parsedUrl.query.folder );
    FileStorageDb.find({fileId : parsedUrl.query.id})
        .select('-_id -__v')
        .exec(function (err, Result) {
            let responseString = JSON.stringify(Result);
            res.end(responseString);
        });
});
fileRouter.use('/move', function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("moving",parsedUrl.query.id,  parsedUrl.query.to);
    res.writeHead(200);

    move(parsedUrl.query.id,  parsedUrl.query.to);

    res.end();
});

function uploadFile(file) {
    file.mv(`${config.fileStoragePath}${file.fileId}`, function (err) {
        if (err)
            return res.status(500).send(err);
    });
}
function addFileToDataBase(target) {
    console.log(target);
    let name = target.name || "unnamed",
        fileId = target.fileId || "",
        mimetype = target.mimetype || "",
        link = target.link || `${config.ip}:${config.port}/${target.name}`,
        uploadDate = moment().format('MMMM Do YYYY, h:mm:ss a'),
        owner = target.owner || "SashaGrin",
        access = target.access || [],
        isFolder = target.isFolder || false,
        parent = target.parent || "/";

    FileStorageDb.create(
        {name, fileId, mimetype, link, uploadDate, owner, access, parent, isFolder},
        function (err) {
            if (err) return console.log(err);
        })
}
function rename(fileId, newName){
    FileStorageDb.updateOne({fileId:fileId}, {name:newName}, function (err) {
        if (err) return console.log(err);
    })
}
function deleteItem(fileId){
    FileStorageDb.deleteOne({fileId:fileId}, function (err) {
        if (err) return console.log(err);
    })
}
function move(fileId, newParent){
    FileStorageDb.updateOne({fileId:fileId}, {parent:newParent}, function (err) {
        if (err) return console.log(err);
    })
}






module.exports = fileRouter;

