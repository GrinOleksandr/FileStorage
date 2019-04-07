
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
    fileRouter = express.Router(),
    TokenGenerator = require('uuid-token-generator'),
    tokgen = new TokenGenerator(),
    archiver = require('archiver'),
    zipdir = require('zip-dir'),
    filesize = require('file-size'),
    passport = require('passport'),
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser'),
    auth = require('../router/auth.js')(passport),
    session = require('express-session');


require('../passport')(passport);
fileRouter.use(cookieParser());


let expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
fileRouter.use(session({
    secret: 'husgFt4$6r5ftg.',
    saveUninitialized: false,
    resave: false,
    cookie: {
        expires: expiryDate
    }
}));

fileRouter.use(passport.initialize());
fileRouter.use(passport.session());

let loggedin = function (req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
};



fileRouter.use(fileUpload());
fileRouter.use(bodyParser.json());
fileRouter.use('/listfiles', loggedin,function(req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
    FileStorageDb.find({parent : parsedUrl.query.folder, owner: req.user.username})
        .select('-_id -__v')
        .exec(function (err, Result) {
            let responseString = JSON.stringify(Result);
            res.end(responseString);
        });
});
fileRouter.use('/getusername', loggedin,function(req, res) {
              res.end(req.user.username);
});
fileRouter.use('/getfilessharedtome', loggedin, function(req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
    if(parsedUrl.query.folder === "/") {
        FileStorageDb.find({parent : parsedUrl.query.folder, access: req.user.username})
            .select('-_id -__v')
            .exec(function (err, Result) {
                let responseString = JSON.stringify(Result);
                res.end(responseString);
            });
    }
    else {
        FileStorageDb.find({access: req.user.username})
            .select('-_id -__v')
            .exec(function (err, Result) {
                let responseString = JSON.stringify(Result);
                res.end(responseString);
            });
    }

});
fileRouter.use('/download', loggedin, function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    FileStorageDb.find({fileId: parsedUrl.query.id}, function (err, file) {
        if (err) return console.log(err);
        if (file) {
            fs.readFile(`${config.fileStoragePath}${file[0].fileId}`, function (err, data) {
                if (err) {
                    return res.status(500).send(err);
                }
                res.end(data);
            });
        }
    });

});
fileRouter.use('/downloadsharedfile', function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    FileStorageDb.find({fileId: parsedUrl.query.file}, function (err, file) {
        if (err) return console.log(err);
        if (file && file[0].isShared) {
            fs.readFile(`${config.fileStoragePath}${file[0].fileId}`, function (err, data) {
                if (err) {
                    return res.status(500).send(err);
                }
                res.end(data);
            });
        }
    });

});
fileRouter.use('/upload', loggedin,function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    if (Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    else if (Array.isArray(req.files.fileInput)) {
        let uploadedFiles = req.files.fileInput;
        uploadedFiles.forEach(function (item) {
            if (item.mimetype) {
                item.fileId = tokgen.generate();
                item.parent = parsedUrl.query.parent;
                item.owner = req.user.username;
                item.access = parsedUrl.query.access.split(",");
                uploadFile(item);
                addFileToDataBase(item);
            }
        });
    }
    else {
        let uploadedFile = req.files.fileInput;
        if (uploadedFile.mimetype) {
            uploadedFile.fileId = tokgen.generate();
            uploadedFile.parent = parsedUrl.query.parent;
            uploadedFile.access = parsedUrl.query.access.split(",");
            uploadedFile.owner = req.user.username;
            uploadFile(uploadedFile);
            addFileToDataBase(uploadedFile);
        }
    }
    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*"});
    res.end('File uploaded!');
});
fileRouter.use('/createfolder', loggedin, function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.writeHead(200);
    let folder = {
        name: parsedUrl.query.name,
        fileId: tokgen.generate(),
        isFolder: true,
        mimetype: "folder",
        link: `${this.fileId}${suid(16)}`,
        uploadDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
        owner: req.user.username,
        access: parsedUrl.query.access.split(","),
        parent: parsedUrl.query.parent,
        isShared: false
    };
    addFileToDataBase(folder);

    res.end();
});
fileRouter.use('/rename', loggedin, function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);

    rename(parsedUrl.query.id,  parsedUrl.query.newname);

    res.end();
});
fileRouter.use('/delete', loggedin, function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);

    deleteItem(parsedUrl.query.id);

    res.end();
});
fileRouter.use('/getelement', loggedin, function(req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
    FileStorageDb.find({fileId : parsedUrl.query.id})
        .select('-_id -__v')
        .exec(function (err, Result) {
            let responseString = JSON.stringify(Result);
            res.end(responseString);
        });
});
fileRouter.use('/getsharedfileinfo', function(req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
    if(parsedUrl.query.file) {
        FileStorageDb.find({link: parsedUrl.query.file})
            .select('-_id -__v')
            .exec(function (err, Result) {
                if (Result[0] && Result[0].isShared) {
                    if (Result[0].isFolder) {
                        res.end("Folder");
                    } else {
                        let responseString = JSON.stringify(Result);
                        res.end(responseString);
                    }
                } else res.end("Access denied")
            });
    }
});
fileRouter.use('/move', loggedin, function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);

    move(parsedUrl.query.id,  parsedUrl.query.to);

    res.end();
});
fileRouter.use('/sharebylink', loggedin, function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    digAndShareByLink(parsedUrl.query.id);
    res.end();
});
fileRouter.use('/unsharebylink', loggedin, function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    digAndUnShareByLink(parsedUrl.query.id);
    res.end();
});
fileRouter.use('/share', loggedin,function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    digAndShare(parsedUrl.query.id, parsedUrl.query.user ,req.user.username );
    res.end();
});
fileRouter.use('/unshare',loggedin, function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    digAndUnShare(parsedUrl.query.id, parsedUrl.query.user ,req.user.username);
    res.end();
});


function uploadFile(file) {
    file.mv(`${config.fileStoragePath}${file.fileId}`, function (err) {
        if (err)
            return res.status(500).send(err);
    });
}
function addFileToDataBase(target) {
    let name = target.name || "unnamed",
        size = filesize(target.size).human();
        fileId = target.fileId || "",
        mimetype = target.mimetype || "",
        link = target.link || tokgen.generate(),
        uploadDate = moment().format('MMMM Do YYYY, h:mm:ss a'),
        owner = target.owner || "",
        access = target.access || [],
        isFolder = target.isFolder || false,
        parent = target.parent || "/",
        isShared = target.isShared || false;
    FileStorageDb.create(
        {name, size, fileId, mimetype, link, uploadDate, owner, access, parent, isFolder, isShared},
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
function digAndShareByLink(id){
        let childrenArray = [];
        lookForChildren(id);
    function lookForChildren(id){
        childrenArray.push(id);
        shareItemByLink(id);
        FileStorageDb.find({parent : id})
            .select('-_id -__v')
            .exec(function (err, result) {

                if(result.length) {
                    result.forEach(function(item){
                        lookForChildren(item.fileId);
                    })
                }
            });
    }
}
function shareItemByLink(idToShare) {
    FileStorageDb.updateOne({fileId: idToShare}, {isShared: true}, function (err) {
        if (err) return console.log(err);
    });
}
function digAndUnShareByLink(id){
    let childrenArray = [];
    lookForChildren(id);
    function lookForChildren(id){
        childrenArray.push(id);
        unShareItemByLink(id);
        FileStorageDb.find({parent : id})
            .select('-_id -__v')
            .exec(function (err, result) {
                if(result.length) {
                    result.forEach(function(item){
                        lookForChildren(item.fileId);
                    })
                }
            });
    }
}
function unShareItemByLink(id) {
    FileStorageDb.updateOne({fileId: id}, {isShared: false}, function (err) {
        if (err) return console.log(err);
    });
}
function digAndShare(id, user, owner){
    let childrenArray = [];
    lookForChildren(id);
    function lookForChildren(id){
        childrenArray.push(id);
        shareItem(id, user, owner);
        FileStorageDb.find({parent : id})
            .select('-_id -__v')
            .exec(function (err, result) {

                if(result.length) {
                    result.forEach(function(item){
                        lookForChildren(item.fileId);
                    })
                }
            });
    }
}
function shareItem(idToShare, user, owner) {
    let accessString = [];
    let trueOwner = "";
    FileStorageDb.find({fileId : idToShare})
        .select('-_id -__v')
        .exec(function (err, Result) {
            accessString = Result[0].access;
            trueOwner = Result[0].owner;
            if(owner === trueOwner && owner !== user) {
                if(accessString.indexOf(user) === -1) {
                    accessString.push(user);
                    FileStorageDb.updateOne({fileId: idToShare}, {access: accessString}, function (err) {
                        if (err) return console.log(err);
                    });
                }
            }
        });



}
function digAndUnShare(id, user, owner){
    let childrenArray = [];
    lookForChildren(id);
    function lookForChildren(id){
        childrenArray.push(id);
        unShareItem(id, user, owner);
        FileStorageDb.find({parent : id})
            .select('-_id -__v')
            .exec(function (err, result) {
                if(result.length) {
                    result.forEach(function(item){
                        lookForChildren(item.fileId);
                    })
                }
            });
    }
}
function unShareItem(id, user, owner) {
    let accessString = [];
    let trueOwner = "";
    FileStorageDb.find({fileId : id})
        .select('-_id -__v')
        .exec(function (err, Result) {
            accessString = Result[0].access;
            trueOwner = Result[0].owner;
            if(owner === trueOwner){
                let newAccessString = accessString.filter(function(item){
                    return item !== user
                });
                FileStorageDb.updateOne({fileId: id}, {access: newAccessString}, function (err) {
                    if (err) return console.log(err);
                });
            }
        });

}

module.exports = fileRouter;

