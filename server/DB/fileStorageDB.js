const mongoose = require('mongoose');

const fileStorageSchema = new mongoose.Schema({
    name : String,
    fileId:String,
    mimetype : String,
    link: String,
    uploadDate: String,
    owner: String,
    access: String,
    parent: String,
    isShared: Boolean,
    isFolder: Boolean
});

let fileStorageDB = mongoose.model('FileStorage1234223', fileStorageSchema );
module.exports = fileStorageDB ;