
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

fileRouter.use(fileUpload());
fileRouter.use(bodyParser.json());
fileRouter.use('/listfiles', function(req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
    console.log('MY USER !@!#@!#@#@!', req.user.username);
    FileStorageDb.find({parent : parsedUrl.query.folder, owner: req.user.username})
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
            });
        }
    });

});

fileRouter.use('/upload', function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    if (Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    else if (Array.isArray(req.files.fileInput)) {
        let uploadedFiles = req.files.fileInput;
        uploadedFiles.forEach(function (item) {
            console.log("****INCOMING FILE  ", item);
            if (item.mimetype) {
                item.fileId = suid(16);
                item.parent = parsedUrl.query.parent;
                item.owner = req.user.username;
                uploadFile(item);
                addFileToDataBase(item);
            }
        });
    }
    else {
        let uploadedFile = req.files.fileInput;
        console.log("****INCOMING FILE  ", uploadedFile);
        if (uploadedFile.mimetype) {
            uploadedFile.fileId = suid(16);
            uploadedFile.parent = parsedUrl.query.parent;
            uploadedFile.owner = req.user.username;
            uploadFile(uploadedFile);
            addFileToDataBase(uploadedFile);
        }
    }
    console.log('***File uploaded' , 'owner', req.user.username);
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
        link: `${this.fileId}${suid(16)}`,
        uploadDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
        owner: req.user.username,
        access: "SashaGrin",
        parent: parsedUrl.query.parent,
        isShared: false
    };

    console.log('folder created' ,folder);

    addFileToDataBase(folder);

    res.end();
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
fileRouter.use('/share', function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("sharing  ",parsedUrl.query.id);
    res.writeHead(200);
    digAndShare(parsedUrl.query.id);
    res.end();
});
fileRouter.use('/unshare', function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("unsharing  ",parsedUrl.query.id);
    res.writeHead(200);
    digAndUnShare(parsedUrl.query.id);
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
        link = target.link || `${target.fileId}${suid(16)}`,
        uploadDate = moment().format('MMMM Do YYYY, h:mm:ss a'),
        owner = target.owner || "SashaGrin",
        access = target.access || [],
        isFolder = target.isFolder || false,
        parent = target.parent || "/",
        isShared = target.isShared || false;
console.log(target);
    FileStorageDb.create(
        {name, fileId, mimetype, link, uploadDate, owner, access, parent, isFolder, isShared},
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

function makeMeShared(id){
    FileStorageDb.updateOne({fileId:id}, {isShared:true}, function (err) {
        if (err) return console.log(err);
    })
}

function digAndShare(id){
        let childrenArray = [];
        lookForChildren(id);
    function lookForChildren(id){
        childrenArray.push(id);
        shareItem(id);
        FileStorageDb.find({parent : id})
            .select('-_id -__v')
            .exec(function (err, result) {

                if(result.length) {
                    result.forEach(function(item){
                        console.log('i am child!: ', item);
                        lookForChildren(item.fileId);
                    })
                }
                console.log('my children is: ', result);

            });
        console.log('********* PARSEd CHILREN!: ', childrenArray)
    }


}

function shareItem(idToShare) {
    FileStorageDb.updateOne({fileId: idToShare}, {isShared: true}, function (err) {
        if (err) return console.log(err);
    });
    console.log('root element shared', idToShare)
}

function digAndUnShare(id){
    let childrenArray = [];
    lookForChildren(id);
    function lookForChildren(id){
        childrenArray.push(id);
        unShareItem(id);
        FileStorageDb.find({parent : id})
            .select('-_id -__v')
            .exec(function (err, result) {
                if(result.length) {
                    result.forEach(function(item){
                        console.log('i am child!: ', item);
                        lookForChildren(item.fileId);
                    })
                }
                console.log('my children is: ', result);
            });
        console.log('********* PARSEd CHILREN!: ', childrenArray)
    }
}

function unShareItem(id) {
    FileStorageDb.updateOne({fileId: id}, {isShared: false}, function (err) {
        if (err) return console.log(err);
    });
    console.log('root element access closed', id)
}





module.exports = fileRouter;

