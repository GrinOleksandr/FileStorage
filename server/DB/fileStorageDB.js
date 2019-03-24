const mongoose = require('mongoose');

const fileStorageSchema = new mongoose.Schema({
    name : String,
    fileId:String,
    mimetype : String,
    link: String,
    uploadDate: String,
    owner: String,
    access: String,
    parentId: String,
    parentName: String,
    isFolder: Boolean
});

let fileStorageDB = mongoose.model('FileStorage99', fileStorageSchema );
module.exports = fileStorageDB ;