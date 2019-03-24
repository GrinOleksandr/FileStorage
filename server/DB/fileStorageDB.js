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
    isFolder: Boolean
});

let fileStorageDB = mongoose.model('FileStorage999', fileStorageSchema );
module.exports = fileStorageDB ;