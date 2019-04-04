
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
    filesize = require('file-size');



fileRouter.use(fileUpload());
fileRouter.use(bodyParser.json());
fileRouter.use('/listfiles', function(req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
    console.log('MY USER', req.user.username);
    FileStorageDb.find({parent : parsedUrl.query.folder, owner: req.user.username})
        .select('-_id -__v')
        .exec(function (err, Result) {
            let responseString = JSON.stringify(Result);
            res.end(responseString);
        });
});
fileRouter.use('/getusername', function(req, res) {
              res.end(req.user.username);
});
fileRouter.use('/getfilessharedtome', function(req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
    console.log('MY USER', req.user.username);
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
fileRouter.use('/download', function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    FileStorageDb.find({fileId: parsedUrl.query.id}, function (err, file) {
        if (err) return console.log(err);
        if (file) {
            console.log('file found: ', file[0].fileId);
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
        console.log('filefile',file);
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
// fileRouter.use('/downloadsharedfolder', function (req, res) {
//
//     let parsedUrl = url.parse(req.url, true);
//     res.setHeader('Content-Type', 'text/plain');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     FileStorageDb.find({fileId: parsedUrl.query.folder}, function (err, file) {
//         if (err) return console.log(err);
//         console.log('filefile',file);
//         if (file && file[0].isShared && file[0].isFolder) {
//             digAndArchive(file[0].fileId, file[0].name);
//         }
//     });
//
// });
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
        console.log('FILESFILES!!!!', req.files);
        console.log("****INCOMING FILE faaaaaaaaaa ", parsedUrl.query.access);
        if (uploadedFile.mimetype) {
            uploadedFile.fileId = tokgen.generate();
            uploadedFile.parent = parsedUrl.query.parent;
            uploadedFile.access = parsedUrl.query.access.split(",");
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
    console.log("********************TRUE ACCESS RIGHTS ON FOLER",parsedUrl.query.access.split(","));

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
    FileStorageDb.find({fileId : parsedUrl.query.id})
        .select('-_id -__v')
        .exec(function (err, Result) {
            let responseString = JSON.stringify(Result);
            res.end(responseString);
        });
});
fileRouter.use('/getsharedfileinfo', function(req, res) {
    let parsedUrl = url.parse(req.url, true);
    console.log('Requested shared file!: ', parsedUrl.query.file);
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': "*"});
    FileStorageDb.find({link : parsedUrl.query.file})
        .select('-_id -__v')
        .exec(function (err, Result) {
            console.log(Result);
            console.log('faaaaaaaaaaaaaaaaa',Result[0]);
            if(Result[0].isShared) {
                if(Result[0].isFolder) {
                    res.end("Folder");
                }

                else {
                    let responseString = JSON.stringify(Result);
                    res.end(responseString);
                }
            }
            else res.end("Access denied")


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
fileRouter.use('/sharebylink', function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("sharing  ",parsedUrl.query.id);
    res.writeHead(200);
    digAndShareByLink(parsedUrl.query.id);
    res.end();
});
fileRouter.use('/unsharebylink', function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("unsharing  ",parsedUrl.query.id);
    res.writeHead(200);
    digAndUnShareByLink(parsedUrl.query.id);
    res.end();
});
fileRouter.use('/share', function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("sharing  ",parsedUrl.query.id, parsedUrl.query.user ,req.user.username);
    res.writeHead(200);
    digAndShare(parsedUrl.query.id, parsedUrl.query.user ,req.user.username );
    res.end();
});
fileRouter.use('/unshare', function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("unsharing  ",parsedUrl.query.id, parsedUrl.query.user ,req.user.username);
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

    console.log(target);
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
console.log(target);
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
                        console.log('i am child!: ', item);
                        lookForChildren(item.fileId);
                    })
                }
                console.log('my children is: ', result);

            });
        console.log('********* PARSEd CHILREN!: ', childrenArray)
    }
}
function shareItemByLink(idToShare) {
    FileStorageDb.updateOne({fileId: idToShare}, {isShared: true}, function (err) {
        if (err) return console.log(err);
    });
    console.log('root element shared', idToShare)
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
                        console.log('i am child!: ', item);
                        lookForChildren(item.fileId);
                    })
                }
                console.log('my children is: ', result);
            });
        console.log('********* PARSEd CHILREN!: ', childrenArray)
    }
}
function unShareItemByLink(id) {
    FileStorageDb.updateOne({fileId: id}, {isShared: false}, function (err) {
        if (err) return console.log(err);
    });
    console.log('root element access closed', id)
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
                        console.log('i am child!: ', item);
                        lookForChildren(item.fileId);
                    })
                }
                console.log('my children is: ', result);

            });
        console.log('********* PARSEd CHILREN!: ', childrenArray)
    }
}
function shareItem(idToShare, user, owner) {
    console.log('realy sharing',idToShare, user, owner );
    let accessString = [];
    let trueOwner = "";
    FileStorageDb.find({fileId : idToShare})
        .select('-_id -__v')
        .exec(function (err, Result) {
            accessString = Result[0].access;
            trueOwner = Result[0].owner;
            if(owner === trueOwner && owner !== user) {
                if(accessString.indexOf(user) === -1) {
                    console.log("***********REAL RESULT ACCESS!", accessString);
                    console.log("***********PUSHING TO NEW STRING NEW STRING!!", user);
                    accessString.push(user);
                    console.log("***********REAL NEW STRING!!", accessString);
                    console.log('Access', accessString);
                    FileStorageDb.updateOne({fileId: idToShare}, {access: accessString}, function (err) {
                        if (err) return console.log(err);
                    });
                    console.log('root element shared', idToShare)
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
                        console.log('i am child!: ', item);
                        lookForChildren(item.fileId);
                    })
                }
                console.log('my children is: ', result);
            });
        console.log('********* PARSEd CHILREN!: ', childrenArray)
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
                console.log('Access', newAccessString);
                FileStorageDb.updateOne({fileId: id}, {access: newAccessString}, function (err) {
                    if (err) return console.log(err);
                });
                console.log('root element shared', id)
            }
        });

}



// function digAndArchive(id, initialFolderName) {
//     let childrenArray = [];
//     let folderPath = `${config.fileStoragePath}`;
//
//     lookForChildren(id);
//     // zipdir(`${config.fileStoragePath}${initialFolderName}`, { saveTo: `${config.fileStoragePath}${initialFolderName}.zip` }, function (err, buffer) {
//     //     if(err){
//     //         console.log(err);
//     //     }
//     //     else console.log('WOOHOO!zipped!  ' );
//     // });
//
//
//
//
//
//     function lookForChildren(id) {
//         childrenArray.push(id);
//         FileStorageDb.find({fileId: id})
//             .select('-_id -__v')
//             .exec(function (err, result) {
//                 createFileStructure(result[0])
//                 if(result[0].isFolder){
//                     folderPath += `/${result[0].name}`;
//                     lookForChildren(result[0].fileId)
//                 }
//                 });
//         FileStorageDb.find({parent: id})
//             .select('-_id -__v')
//             .exec(function (err, result) {
//                 if (result.length) {
//                     // folderPath += `/${item.name}
//                     result.forEach(function (item) {
//                         console.log('i am child!: ', item);
//                         createFileStructure(item)
//                     });
//                     result.forEach(function (item) {
//                         console.log('i am child!: ', item);
//                         lookForChildren(item.fileId);
//                     })
//                 }
//                 console.log('my children is: ', result);
//             });
//         console.log('********* PARSEd CHILREN!: ', childrenArray);
//         // console.log('trying to archive');
//         // let archive = archiver('zip', {
//         //     zlib: {level: 9} // Sets the compression level.
//         // });
//         // let output = fs.createWriteStream(`${config.fileStoragePath}temp.zip`);
//         //
//         // archive.pipe(output);
//         //
//         // let getStream = function (fileName) {
//         //     return fs.readFileSync(fileName);
//         // };
//
// //these are the files, want to put into zip archive
// //         let fileNames = ['mock1.data', 'mock2.data', 'mock3.data'];
//
//         // for (let i = 0; i < childrenArray.length; i++) {
//         //     let path = `${config.fileStoragePath}childrenArray[i].fileId`;
//         //     archive.append(getStream(path), {name: childrenArray[i].name});
//         // }
//         //
//         // archive.finalize(function (err, bytes) {
//         //     if (err) {
//         //         throw err;
//         //     }
//         //
//         //     console.log(bytes + ' total bytes');
//         // });
//     }
//
//     function createFileStructure(item) {
//         console.log("my result", item);
//         if (item.isFolder) {
//             folderPath += `/${item.name}`;
//             fs.mkdir(folderPath, { recursive: true }, (err) => {
//                 if (err) throw err;
//             });
//         }
//         else{fs.copyFile(`${config.fileStoragePath}${item.fileId}`, `${folderPath}/${item.name}`, (err) => {
//             if (err) throw err;
//             console.log(`${config.fileStoragePath}${item.fileId} was copied to ${folderPath}/${item.name}`);
//         });
//         }
//     }
// }



//
    //ARCHIVER!!
//      let archive = archiver('zip', {
//         zlib: { level: 9 } // Sets the compression level.
//     });
//     let output = fs.createWriteStream(__dirname + '/temp.zip');
//
//     archive.pipe(output);
//
//     let getStream = function(fileName){
//         return fs.readFileSync(fileName);
//     };
//
// //these are the files, want to put into zip archive
//     let fileNames = ['mock1.data', 'mock2.data', 'mock3.data'];
//
//     for(i=0; i<fileNames.length; i++){
//         let path = __dirname + '/'+fileNames[i];
//         archive.append(getStream(path), { name: fileNames[i]});
//     }
//
//     archive.finalize(function(err, bytes) {
//         if (err) {
//             throw err;
//         }
//
//         console.log(bytes + ' total bytes');
//     });

// //////////////////////
//
//
//
//
// }
//
// function archiveThisItem(id , name){
//     archive.file(id, { name: name });
// }


module.exports = fileRouter;

