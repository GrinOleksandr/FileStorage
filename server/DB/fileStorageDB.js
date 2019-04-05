const mongoose = require('mongoose');

const fileStorageSchema = new mongoose.Schema({
    name : String,
    size: String,
    fileId:String,
    mimetype : String,
    link: String,
    uploadDate: String,
    owner: String,
    access: Array,
    parent: String,
    isShared: Boolean,
    isFolder: Boolean
});

let fileStorageDB = mongoose.model('myFileStorage', fileStorageSchema );
module.exports = fileStorageDB ;