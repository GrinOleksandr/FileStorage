const mongoose = require('mongoose');

const fileStorageSchema = new mongoose.Schema({
    name : String,
    size: Number,
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

let fileStorageDB = mongoose.model('FileStorage123334223', fileStorageSchema );
module.exports = fileStorageDB ;